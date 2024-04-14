use mongodb::{ bson::{ extjson::de::Error }, results::{ InsertOneResult }, Client, Collection, bson::doc };
use futures::stream::{ TryStreamExt };
use std::env;

extern crate dotenv;
use dotenv::dotenv;
use mongodb::bson::oid::ObjectId;
use mongodb::results::{DeleteResult, UpdateResult};

use crate::models::{ User, Application };

pub struct MongoRepo {
    pub users_col: Collection<User>,
    pub applications_col: Collection<Application>,
}

impl MongoRepo {
    pub async fn init() -> Self {
        dotenv().ok();
        let uri = match env::var("MONGOURI") {
            Ok(v) => v.to_string(),
            Err(_) => format!("Error loading env variable"),
        };
        let client = Client::with_uri_str(uri).await.unwrap();
        let db = client.database("AplCoreMain");
        let users_col: Collection<User> = db.collection("Users");
        let applications_col: Collection<Application> = db.collection("Applications");
        MongoRepo { users_col, applications_col }
    }

    pub async fn get_user_applications(&self, user_id: String) -> Result<Vec<Application>, Error> {
        let id = ObjectId::parse_str(user_id).unwrap();
        let query = doc! {"user_id": id };

        let find_detail = self
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

    pub async fn get_one_user_application(&self, app_id: String) -> Result<Option<Application>, Error> {
        let obj_id = ObjectId::parse_str(&app_id)?;
        let query = doc! { "_id": obj_id };
        let app_detail = self
            .applications_col
            .find_one(query, None)
            .await
            .ok()
            .expect("Error getting application");
        Ok(app_detail)
    }

    pub async fn add_application(&self, new_app: Application) -> Result<InsertOneResult, Error> {
        let new_doc = Application {
            id: None,
            user_id: new_app.user_id.clone(),
            title: new_app.title.clone(),
            description: new_app.description.clone(),
            status: new_app.status.clone(),
            is_closed: new_app.is_closed,
            company: new_app.company.clone(),
        };

        let insert_detail = self
            .applications_col
            .insert_one(new_doc, None)
            .await
            .ok()
            .expect("Error adding application");
        Ok(insert_detail)
    }

    pub async fn edit_application(&self, new_app: Application, app_id: String) -> Result<UpdateResult, Error> {
        let obj_id = ObjectId::parse_str(&app_id)?;
        let filter = doc! {"_id": obj_id };
        let new_doc = doc! {
            "$set": {
                "id": new_app.id,
                "user_id": new_app.user_id,
                "title": new_app.title,
                "description": new_app.description,
                "status": new_app.status,
                "is_closed": new_app.is_closed,
                "company": new_app.company,
            },
        };

        let update_detail = self
            .applications_col
            .update_one(filter, new_doc, None)
            .await
            .ok()
            .expect("Error updating application");
        Ok(update_detail)
    }

    pub async fn delete_application(&self, app_id: String) -> Result<DeleteResult, Error> {
        let obj_id = ObjectId::parse_str(&app_id)?;
        let query = doc! {"_id": obj_id };

        let delete_detail = self
            .applications_col
            .delete_one(query, None)
            .await
            .ok()
            .expect("Error deleting application");
        Ok(delete_detail)
    }
}
