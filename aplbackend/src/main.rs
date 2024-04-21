use actix_web::{get, App, HttpResponse, HttpServer, Responder, web::Data, web};
use actix_cors::Cors;
use actix_web_httpauth::middleware::HttpAuthentication;

mod database;
mod endpoints;
mod models;
mod auth_tools;

use endpoints::{
    add_user,
    edit_user,
    get_user,
    delete_user,
    add_application,
    edit_application,
    get_applications,
    get_one_application,
    delete_application,
    login,
    register,
    get_batch,
    get_batches,
    add_batch,
    edit_batch,
    delete_batch
};

use database::MongoRepo;
use crate::models::Claims;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().json("Hello World!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let db = MongoRepo::init().await;
    let db_data = Data::new(db);


    HttpServer::new(move || {
        let auth = HttpAuthentication::bearer(auth_tools::validator);

        App::new()
            .app_data(db_data.clone())
            .service(
                web::scope("/api")
                    .wrap(auth)
                    .service(add_user)
                    .service(get_user)
                    .service(edit_user)
                    .service(delete_user)
                    .service(add_application)
                    .service(get_applications)
                    .service(get_one_application)
                    .service(edit_application)
                    .service(delete_application)
                    .service(get_batch)
                    .service(get_batches)
                    .service(add_batch)
                    .service(edit_batch)
                    .service(delete_batch)
            )
            .service(
                web::scope("/auth")
                    .service(login)
                    .service(register)
            )
            .service(hello)
    })
    .bind(("localhost", 8080))?
    .run()
    .await
}
