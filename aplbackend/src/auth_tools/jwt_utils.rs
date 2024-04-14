use jsonwebtoken::{ encode, EncodingKey, Header };
use actix_web::{ cookie, HttpResponse };
use chrono::{ TimeDelta, Utc };
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: i64,
}

pub fn generate_jwt(id: &str) -> String {
    let claims = Claims {
        sub: id.to_string(),
        exp: (Utc::now() + TimeDelta::try_days(1).unwrap()).timestamp(),
    };
    encode(&Header::default(), &claims, &EncodingKey::from_secret("secret".as_ref())).unwrap()
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
