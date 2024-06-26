use mongodb::bson::oid::ObjectId;
use serde::{ Serialize, Deserialize };

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct User {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub name: String,
    pub password: String,
    pub email: String,
    pub role: String,
    pub age: u32,
}
