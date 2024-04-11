use actix_web::{ web, HttpResponse, Responder, HttpRequest, post, web::Data, web::Json };
use jsonwebtoken::{ encode, EncodingKey, Header };
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    exp: usize,
}

#[derive(Deserialize)]
pub struct LoginRequest {
    username: String,
    password: String,
}

