use actix_web::{Responder, get, post, patch, delete, HttpResponse, web::Path, web::Json, web::Data };
use crate::database::MongoRepo;
use crate::models::{ User };


#[get("user/{id}")]
async fn get_user(id: Path<User>, db: Data<MongoRepo>) -> impl Responder {
    HttpResponse::Ok().body("Not Implemented")
}

#[post("user/add")]
async fn add_user(new_user: Json<User>, db: Data<MongoRepo>) -> impl Responder {
    let user = User {
        id: None,
        name: new_user.name.to_owned(),
        password: new_user.password.to_owned(),
        age: new_user.age.to_owned(),
    };
    let user_detail = db.create_user(user).await;
    match user_detail {
        Ok(user) => HttpResponse::ok().json(user),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[patch("user/edit/{id}")]
async fn edit_user(id: Path<User>) -> impl Responder {
    HttpResponse::Ok().body("Not Implemented")
}

#[delete("user/delete/{id}")]
async fn delete_user(id: Path<User>) -> impl Responder {
    HttpResponse::Ok().body("Not Implemented")
}