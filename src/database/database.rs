use mongodb::{ bson::{ extjson::de::Error }, results::{ InsertOneResult }, Client, Collection, bson::doc };
use std::env;
extern crate dotenv;
use dotenv::dotenv;
use mongodb::bson::oid::ObjectId;
use mongodb::results::{DeleteResult, UpdateResult};

use crate::models::user_model::User;

pub struct MongoRepo {
    col: Collection<User>,
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
        let col: Collection<User> = db.collection("Users");
        MongoRepo { col }
    }

    pub async fn create_user(&self, new_user: User) -> Result<InsertOneResult, Error> {
        let new_doc = User {
            id: None,
            role: new_user.role.clone(),
            name: new_user.name.clone(),
            password: new_user.password.clone(),
            age: new_user.age
        };
        let user = self
            .col
            .insert_one(new_doc, None)
            .await
            .ok()
            .expect("Error creating user");
        Ok(user)
    }

    pub async fn get_user(&self, id: String) -> Result<Option<User>, Error> {
        let obj_id = ObjectId::parse_str(&id)?;
        let query = doc! { "_id": obj_id };
        let user = self
            .col
            .find_one(query, None)
            .await
            .expect("Error getting user");
        Ok(user)
    }

    pub async fn edit_user(&self, updated_user: User, id: String) -> Result<UpdateResult, Error> {
        let obj_id = ObjectId::parse_str(&id)?;
        let filter = doc! {"_id": obj_id };
        let new_doc = doc! {
            "$set": {
                "id": updated_user.id,
                "name": updated_user.name,
                "password": updated_user.password,
                "age": updated_user.age
            },
        };
        let updated_doc = self
            .col
            .update_one(filter, new_doc, None)
            .await
            .ok()
            .expect("Error updating user");
        Ok(updated_doc)
    }

    pub async fn delete_user(&self, user_id: String) -> Result<DeleteResult, Error> {
        let id = ObjectId::parse_str(user_id).unwrap();
        let query = doc! {"_id": id };

        let user_detail = self
            .col
            .delete_one(query, None)
            .await
            .ok()
            .expect("Error deleting User");
        Ok(user_detail)
    }
}
