use mongodb::bson::oid::ObjectId;
use serde::{ Serialize, Deserialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct Application {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub user_id: Option<ObjectId>,
    pub title: String,
    pub description: String,
    pub status: String,
    pub is_closed: bool,
    pub company: String,
}