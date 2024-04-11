use actix_web::{ HttpResponse, Responder, HttpRequest, post, web::Data, web::Json };
use jsonwebtoken::{ encode, EncodingKey, Header };
use crate::models::{ Claims, LoginRequest, RegisterRequest, user_model };

#[post("/auth/login")]
async fn login(info: Json<LoginRequest>) -> impl Responder {

}

#[post("/auth/register")]
async fn register(new_user: Json<RegisterRequest>) -> impl Responder {

}