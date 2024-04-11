use actix_web::{ web, HttpResponse, Responder, HttpRequest, post, web::Data, web::Json };
use jsonwebtoken::{ encode, EncodingKey, Header };
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

#[derive(Deserialize)]
pub struct LoginRequest {
    pub name: String,
    pub password: String,
}

#[derive(Serialize, Debug, Deserialize)]
pub struct RegisterRequest {
    pub name: String,
    pub password: String,
    pub email: String,
    pub role: String,
    pub age: u32
}

