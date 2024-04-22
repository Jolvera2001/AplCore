use actix_web::web::Data;
use futures::TryStreamExt;
use mongodb::bson::doc;
use mongodb::bson::extjson::de::Error;
use mongodb::bson::oid::ObjectId;
use mongodb::results::{DeleteResult, InsertOneResult, UpdateResult};
use crate::database::MongoRepo;
use crate::models::Application;

pub async fn get_user_applications_crud(user_id: String, db: Data<MongoRepo>) -> Result<Vec<Application>, Error> {
    let id = ObjectId::parse_str(user_id).unwrap();
    let query = doc! {"user_id": id };

    let find_detail = db
        .applications_col
        .find(query, None)
        .await
        .ok()
        .expect("Error getting user applications");

    // TryStream uses try_collect() and collects into a Result<Vec<T>>
    // let v: Vec<_> = cursor.try_collect().await?;
    let app_vec: Vec<Application> = find_detail
        .try_collect()
        .await
        .ok()
        .expect("Error getting user applications");
    Ok(app_vec)
}

pub async fn get_one_user_application_crud(app_id: String, db: Data<MongoRepo>) -> Result<Option<Application>, Error> {
    let obj_id = ObjectId::parse_str(&app_id)?;
    let query = doc! { "_id": obj_id };
    let app_detail = db
        .applications_col
        .find_one(query, None)
        .await
        .ok()
        .expect("Error getting application");
    Ok(app_detail)
}

pub async fn add_application_crud(new_app: Application, db: Data<MongoRepo>) -> Result<InsertOneResult, Error> {
    let new_doc = Application {
        id: None,
        user_id: new_app.user_id.clone(),
        batch_id: new_app.batch_id.clone(),
        title: new_app.title.clone(),
        description: new_app.description.clone(),
        status: new_app.status.clone(),
        is_closed: new_app.is_closed,
        company: new_app.company.clone(),
    };

    let insert_detail = db
        .applications_col
        .insert_one(new_doc, None)
        .await
        .ok()
        .expect("Error adding application");
    Ok(insert_detail)
}

pub async fn edit_application_crud(new_app: Application, app_id: String, db: Data<MongoRepo>) -> Result<UpdateResult, Error> {
    let obj_id = ObjectId::parse_str(&app_id)?;
    let filter = doc! {"_id": obj_id };
    let new_doc = doc! {
            "$set": {
                "user_id": new_app.user_id,
                "batch_id": new_app.batch_id,
                "title": new_app.title,
                "description": new_app.description,
                "status": new_app.status,
                "is_closed": new_app.is_closed,
                "company": new_app.company,
            },
        };

    let update_detail = db
        .applications_col
        .update_one(filter, new_doc, None)
        .await
        .ok()
        .expect("Error updating application");
    Ok(update_detail)
}

pub async fn delete_application_crud(app_id: String, db: Data<MongoRepo>) -> Result<DeleteResult, Error> {
    let obj_id = ObjectId::parse_str(&app_id)?;
    let query = doc! {"_id": obj_id };

    let delete_detail = db
        .applications_col
        .delete_one(query, None)
        .await
        .ok()
        .expect("Error deleting application");
    Ok(delete_detail)
}