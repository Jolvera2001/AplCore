use mongodb::bson::oid::ObjectId;
use serde::{Serialize, Deserialize };

#[derive(Serialize, Deserialize)]
pub struct Batch {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub name: String,
    pub description: String
}