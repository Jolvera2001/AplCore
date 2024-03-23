use actix_web::{Responder, get, post, patch, delete, HttpResponse, web::Path, web::Json, web::Data };
use crate::database::MongoRepo;
use crate::models::{ User };


#[get("user/{id}")]
pub async fn get_user(id: Path<String>, db: Data<MongoRepo>) -> impl Responder {
    let obj_id = id.to_string();
    let user_detail = db.get_user(obj_id);
    match user_detail {
        Ok(result) => HttpResponse::ok().json(result),
        Err(err) => HttpResponse::InternalServerError().body(err.to_tring()),
    }
}

#[post("user/add")]
pub async fn add_user(new_user: Json<User>, db: Data<MongoRepo>) -> impl Responder {
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
pub async fn edit_user(id: Path<String>, new_user: Json<User>, db: Data<MongoRepo>) -> impl Responder {
    let user = User {
        id: new_user.clone(),
        name: new_user.clone(),
        password: new_user.clone(),
        age: new_user.clone()
    };

    let obj_id: String = id.to_string();
    let user_detail = db.edit_user(user, obj_id);
    match user_detail {
        Ok(result) => HttpResponse::ok().json(result),
        Err(err) => HttpResponse::InternalServerError().body(err.to_String()),
    }
}

#[delete("user/delete/{id}")]
pub async fn delete_user(id: Path<User>, db: Data<MongoRepo>) -> impl Responder {
    let obj_id = id.to_string();
    let user_detail = db.delete_user(obj_id);
    match user_detail {
        Ok(result) => HttpResponse::ok().json(result),
        Err(err) => HttpResponse::InternalServerError().body(err.to_tring()),
    }
}