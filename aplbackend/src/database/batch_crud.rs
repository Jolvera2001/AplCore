use actix_web::web::Data;
use futures::TryStreamExt;
use mongodb::bson::doc;
use mongodb::bson::extjson::de::Error;
use mongodb::bson::oid::ObjectId;
use mongodb::results::{DeleteResult, InsertOneResult, UpdateResult};
use crate::database::MongoRepo;
use crate::models::batch_model::Batch;

pub async fn create_batch_crud(new_batch: Batch, db: Data<MongoRepo>) -> Result<InsertOneResult, Error> {
    let new_doc = Batch {
        id: None,
        name: new_batch.name.clone(),
        description: new_batch.description.clone(),
    };

    let batch = db
        .batches_col
        .insert_one(new_doc, None)
        .await
        .ok()
        .expect("Error creating batch");
    Ok(batch)
}

pub async fn get_batch_crud(id: String, db: Data<MongoRepo>) -> Result<Option<Batch>, Error> {
    let obj_id = ObjectId::parse_str(&id)?;
    let query = doc! { "_id": obj_id };
    let batch = db
        .batches_col
        .find_one(query, None)
        .await
        .ok()
        .expect("Error getting batch");
    Ok(batch)
}

pub async fn get_all_batches_crud(user_id: String, db: Data<MongoRepo>) -> Result<Vec<Batch>, Error> {
    let id = ObjectId::parse_str(user_id).unwrap();
    let query = doc! {"user_id": id };

    let find_detail = db
        .batches_col
        .find(query, None)
        .await
        .ok()
        .expect("Error getting user batches");

    let batch_vec: Vec<Batch> = find_detail
        .try_collect()
        .await
        .ok()
        .expect("Error getting user batches");
    Ok(batch_vec)
}

pub async fn edit_batch_crud(updated_batch: Batch, id: String, db: Data<MongoRepo>) -> Result<UpdateResult, Error> {
    let obj_id = ObjectId::parse_str(&id)?;
    let filter = doc! { "_id": obj_id };
    let new_doc = doc! {
        "$set": {
            "id": updated_batch.id.clone(),
            "name": updated_batch.name.clone(),
            "description": updated_batch.description.clone(),
            },
    };
    let updated_batch = db
        .batches_col
        .update_one(filter, new_doc, None)
        .await
        .ok()
        .expect("Error updating batch");
    Ok(updated_batch)
}

pub async fn delete_batch_crud(batch_id: String, db: Data<MongoRepo>) -> Result<DeleteResult, Error> {

}