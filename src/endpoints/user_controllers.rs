use actix_web::{Responder, get, post, delete, put, HttpResponse, web::Path, web::Json, web::Data };
use mongodb::bson::oid::ObjectId;
use crate::database::MongoRepo;
use crate::models::{ User };


#[get("/user/{id}")]
pub async fn get_user(id: Path<String>, db: Data<MongoRepo>) -> impl Responder {
    let obj_id = id.into_inner();
    let user_detail = db.get_user(obj_id).await;
    match user_detail {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[post("/user/add")]
pub async fn add_user(new_user: Json<User>, db: Data<MongoRepo>) -> impl Responder {
    let user = User {
        id: None,
        name: new_user.name.to_owned(),
        password: new_user.password.to_owned(),
        age: new_user.age.to_owned(),
    };
    let user_detail = db.create_user(user).await;
    match user_detail {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[put("/user/edit/{id}")]
pub async fn edit_user(id: Path<String>, new_user: Json<User>, db: Data<MongoRepo>) -> impl Responder {
    let user = User {
        id: Some(ObjectId::parse_str(id.clone()).unwrap()),
        name: new_user.name.to_owned(),
        password: new_user.password.to_owned(),
        age: new_user.age.to_owned(),
    };

    let obj_id: String = id.into_inner();
    let user_detail = db.edit_user(user, obj_id).await;
    match user_detail {
        Ok(update_result) => HttpResponse::Ok().json(update_result),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[delete("/user/delete/{id}")]
pub async fn delete_user(id: Path<String>, db: Data<MongoRepo>) -> impl Responder {
    let obj_id = id.into_inner();
    let user_detail = db.delete_user(obj_id).await;
    match user_detail {
        Ok(delete_result) => HttpResponse::Ok().json(delete_result),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}