use actix_web::{Responder, get, post, delete, put, HttpResponse, web::Path, web::Json, web::Data };
use crate::database::MongoRepo;
use crate::database::batch_crud::*;
use crate::models::Batch;

#[get("/batch/single/{id}")]
pub async fn get_batch(id: Path<String>, db: Data<MongoRepo>) -> impl Responder {
    let obj_id = id.clone();
    let batch_detail = get_batch_crud(obj_id, db).await;
    match batch_detail {
        Ok(batch) => HttpResponse::Ok().json(batch),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[get("/batch/{id}")]
pub async fn get_batches(id: Path<String>, db: Data<MongoRepo>) -> impl Responder {
    let obj_id = id.clone();
    let batch_detail = get_all_batches_crud(obj_id, db).await;
    match batch_detail {
        Ok(batch) => HttpResponse::Ok().json(batch),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[post("/batch/add")]
pub async fn add_batch(new_batch: Json<Batch>, db: Data<MongoRepo>) -> impl Responder {
    let batch = json_to_batch(new_batch).await;
    let batch_detail = create_batch_crud(batch, db).await;
    match batch_detail {
        Ok(batch) => HttpResponse::Ok().json(batch),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[put("/batch/edit/{id}")]
pub async fn edit_batch(id: Path<String>, new_batch: Json<Batch>, db: Data<MongoRepo>) -> impl Responder {
    let batch = json_to_batch(new_batch).await;
    let obj_id: String = id.into_inner();
    let update_result = edit_batch_crud(batch, obj_id, db).await;
    match update_result {
        Ok(update_result) => HttpResponse::Ok().json(update_result),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[delete("/batch/delete/{id}")]
pub async fn delete_batch(id: Path<String>, db: Data<MongoRepo>) -> impl Responder {
    let obj_id = id.into_inner();
    let delete_result = delete_batch_crud(obj_id, db).await;
    match delete_result {
        Ok(delete_result) => HttpResponse::Ok().json(delete_result),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn json_to_batch(json: Json<Batch>) -> Batch {
    Batch {
        id: None,
        name: json.name.to_owned(),
        description: json.description.to_owned(),
    }
}