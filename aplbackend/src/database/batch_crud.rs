use actix_web::web::Data;
use futures::TryStreamExt;
use mongodb::bson::doc;
use mongodb::bson::extjson::de::Error;
use mongodb::bson::oid::ObjectId;
use mongodb::results::{DeleteResult, InsertOneResult, UpdateResult};
use crate::database::MongoRepo;
use crate::models::batch_model::Batch;

