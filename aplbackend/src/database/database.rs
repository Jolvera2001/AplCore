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
}
