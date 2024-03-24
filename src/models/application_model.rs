use mongodb::bson::oid::ObjectId;
use serde::{ Serialize, Deserialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct Application {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub user_id: Option<ObjectId>,
    pub job_title: String,
    pub job_description: String,
    pub job_status: String,
    pub job_close: bool,
    pub company: String,
}