use actix_web::{Responder, get, post, delete, put, HttpResponse, web::Path, web::Json, web::Data };
use crate::database::{ MongoRepo, application_crud::* };
use crate::models::{ Application };

#[get("/application/{id}")]
pub async fn get_applications(user_id: Path<String>, db: Data<MongoRepo>) -> impl Responder {
    let obj_id = user_id.into_inner();
    let user_detail = get_user_applications_crud(obj_id, db).await;
    match user_detail {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[get("/application/single/{app_id}")]
pub async fn get_one_application(app_id: Path<String>, db: Data<MongoRepo>) -> impl Responder {
    let obj_id = app_id.into_inner();
    let application_detail = get_one_user_application_crud(obj_id, db).await;
    match application_detail {
        Ok(application) => HttpResponse::Ok().json(application),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[post("/application/add")]
pub async fn add_application(new_application: Json<Application>, db: Data<MongoRepo>) -> impl Responder {
    let application: Application = json_to_application(new_application).await;
    let application_detail = add_application_crud(application, db).await;
    match application_detail {
        Ok(application) => HttpResponse::Ok().json(application),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[put("/application/edit/{id}")]
pub async fn edit_application(id: Path<String>, new_application: Json<Application>, db: Data<MongoRepo>) -> impl Responder {
    let application: Application = json_to_application(new_application).await;
    let obj_id: String = id.into_inner();
    let update_result = edit_application_crud(application, obj_id, db).await;
    match update_result {
        Ok(update_result) => HttpResponse::Ok().json(update_result),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[delete("/application/delete/{id}")]
pub async fn delete_application(id: Path<String>, db: Data<MongoRepo>) -> impl Responder {
    let obj_id = id.into_inner();
    let delete_result = delete_application_crud(obj_id, db).await;
    match delete_result {
        Ok(delete_result) => HttpResponse::Ok().json(delete_result),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

async fn json_to_application(json: Json<Application>) -> Application {
    Application {
        id: None,
        user_id: json.user_id.to_owned(),
        batch_id: json.batch_id.to_owned(),
        title: json.title.to_owned(),
        description: json.description.to_owned(),
        is_closed: json.is_closed,
        status: json.status.to_owned(),
        company: json.company.to_owned(),
    }
}