use mongodb::{ bson::{ extjson::de::Error }, results::{ InsertOneResult }, Client, Collection, bson::doc };
use actix_web::{ Responder, web::Data };
use crate::database::MongoRepo;
use crate::models::{ LoginRequest, RegisterRequest, User };

pub async fn get_user(login: LoginRequest, db: Data<MongoRepo>) -> impl Responder {
    let query = doc! {
        "username": login.name,
        "password": login.password
    };
    let user_detail = db
        .users_col
        .find_one(query, None)
        .await
        .ok()
        .expect("Error running query");
    Ok(user_detail)
}

pub async fn register_user(registration: RegisterRequest, db: Data<MongoRepo>) -> impl Responder {
    let new_user = User {
        id: None,
        name: registration.name,
        password: registration.password,
        email: registration.email,
        role: registration.role,
        age: registration.age
    };
    let user_detail = db
        .users_col
        .insert_one(new_user, None)
        .await
        .Ok()
        .expect("Error running insertion");
    Ok(user_detail)
}
