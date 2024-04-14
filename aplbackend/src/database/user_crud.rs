use actix_web::web::Data;
use mongodb::bson::doc;
use mongodb::bson::extjson::de::Error;
use mongodb::bson::oid::ObjectId;
use mongodb::results::{DeleteResult, InsertOneResult, UpdateResult};
use crate::database::MongoRepo;
use crate::models::User;

pub async fn create_user_crud(new_user: User, db: Data<MongoRepo>) -> Result<InsertOneResult, Error> {
    let new_doc = User {
        id: None,
        role: new_user.role.clone(),
        name: new_user.name.clone(),
        password: new_user.password.clone(),
        email: new_user.email.clone(),
        age: new_user.age
    };

    let user = db
        .users_col
        .insert_one(new_doc, None)
        .await
        .ok()
        .expect("Error creating user");
    Ok(user)
}

pub async fn get_user_crud(id: String, db: Data<MongoRepo>) -> Result<Option<User>, Error> {
    let obj_id = ObjectId::parse_str(&id)?;
    let query = doc! { "_id": obj_id };
    let user = db
        .users_col
        .find_one(query, None)
        .await
        .ok()
        .expect("Error getting user");
    Ok(user)
}

pub async fn edit_user_crud(updated_user: User, id: String, db: Data<MongoRepo>) -> Result<UpdateResult, Error> {
    let obj_id = ObjectId::parse_str(&id)?;
    let filter = doc! {"_id": obj_id };
    let new_doc = doc! {
            "$set": {
                "id": updated_user.id,
                "name": updated_user.name,
                "password": updated_user.password,
                "email": updated_user.email,
                "age": updated_user.age
            },
        };
    let updated_doc = db
        .users_col
        .update_one(filter, new_doc, None)
        .await
        .ok()
        .expect("Error updating user");
    Ok(updated_doc)
}

pub async fn delete_user_crud(user_id: String, db: Data<MongoRepo>) -> Result<DeleteResult, Error> {
    let id = ObjectId::parse_str(user_id).unwrap();
    let query = doc! {"_id": id };

    let user_detail = db
        .users_col
        .delete_one(query, None)
        .await
        .ok()
        .expect("Error deleting User");
    Ok(user_detail)
}