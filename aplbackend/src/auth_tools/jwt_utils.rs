use jsonwebtoken::{
    encode,
    EncodingKey,
    Header,
    decode,
    DecodingKey,
    Validation,
    Algorithm
};

use actix_web::{ cookie, HttpResponse };
use chrono::{ TimeDelta, Utc };
use serde::{ Deserialize, Serialize };
use std::env;
use actix_web::dev::ServiceRequest;
use actix_web_httpauth::extractors::bearer::BearerAuth;


#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    exp: i64,
}

pub async fn validator(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, (actix_web::Error, ServiceRequest)> {
    match validate_jwt(credentials.token()) {
        Ok(_) => Ok(req),
        Err(_) => Err((actix_web::error::ErrorUnauthorized("Invalid token"), req))
    }
}

pub fn generate_jwt(id: &str) -> String {
    let secret = env::var("APLCORE_SECRET").expect("APLCORE_SECRET must be set");
    let exp = (Utc::now() + TimeDelta::try_days(1).unwrap()).timestamp();
    let claims = Claims {
        sub: id.to_string(),
        exp,
    };
    let header = Header::new(Algorithm::HS256);
    encode(&header, &claims, &EncodingKey::from_secret(secret.as_ref())).unwrap()
}

pub fn validate_jwt(token: &str) -> jsonwebtoken::errors::Result<jsonwebtoken::TokenData<Claims>> {
    let secret = env::var("APLCORE_SECRET").expect("APLCORE_SECRET must be set");
    decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::new(Algorithm::HS256),
    )
}

pub fn create_cookie(jwt: &str) -> cookie::Cookie {
    cookie::Cookie::build("token", jwt)
        .secure(true)
        .http_only(true)
        .finish()
}

pub fn respond_with_cookie(cookie: cookie::Cookie) -> HttpResponse {
    HttpResponse::Ok()
        .cookie(cookie)
        .finish()
}
