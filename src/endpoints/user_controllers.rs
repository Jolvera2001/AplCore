use actix_web::{Responder, get, post, patch, delete, HttpResponse, web::Path, web::Json };
use crate::models::user_model::User;

#[get("user/{id}")]
async fn get_user(id: Path<User>) -> impl Responder {
    HttpResponse::Ok().body("Not Implemented")
}

#[post("user/add")]
async fn add_user(new_user: Json<User>) -> impl Responder {
    HttpResponse::Ok().body("Not Implemented")
}

#[patch("user/edit/{id}")]
async fn edit_user(id: Path<User>) -> impl Responder {
    HttpResponse::Ok().body("Not Implemented")
}

#[delete("user/delete/{id}")]
async fn delete_user(id: Path<User>) -> impl Responder {
    HttpResponse::Ok().body("Not Implemented")
}