use actix_web::{Responder, get, post, delete, put, HttpResponse, web::Path, web::Json, web::Data };
use crate::database::MongoRepo;
use crate::models::{Application, User};
use crate::database::user_crud::*;


#[get("/user/{id}")]
pub async fn get_user(id: Path<String>, db: Data<MongoRepo>) -> impl Responder {
    let obj_id = id.clone();
    let user_detail = get_user_crud(obj_id, db).await;
    match user_detail {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[post("/user/add")]
pub async fn add_user(new_user: Json<User>, db: Data<MongoRepo>) -> impl Responder {
    let user: User = json_to_user(new_user).await;
    let user_detail = create_user_crud(user, db).await;
    match user_detail {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[put("/user/edit/{id}")]
pub async fn edit_user(id: Path<String>, new_user: Json<User>, db: Data<MongoRepo>) -> impl Responder {
    let user: User = json_to_user(new_user).await;
    let obj_id: String = id.into_inner();
    let user_detail = edit_user_crud(user, obj_id, db).await;
    match user_detail {
        Ok(update_result) => HttpResponse::Ok().json(update_result),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[delete("/user/delete/{id}")]
pub async fn delete_user(id: Path<String>, db: Data<MongoRepo>) -> impl Responder {
    let obj_id = id.into_inner();
    let user_detail = delete_user_crud(obj_id, db).await;
    match user_detail {
        Ok(delete_result) => HttpResponse::Ok().json(delete_result),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

async fn json_to_user(json: Json<User>) -> User {
    User {
        id: None,
        role: json.role.to_owned(),
        name: json.name.to_owned(),
        password: json.password.to_owned(),
        email: json.email.to_owned(),
        age: json.age.to_owned(),
    }
}