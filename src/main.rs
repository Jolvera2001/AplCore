use actix_web::{get, App, HttpResponse, HttpServer, Responder, web::Data };

mod database;
mod endpoints;
mod models;

use endpoints::{ add_user, edit_user, get_user, delete_user };
use database::MongoRepo;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().json("Hello World!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let db = MongoRepo::init().await;
    let db_data = Data::new(db);

    HttpServer::new(move || App::new()
        .app_data(db_data.clone())
        .service(hello)
        .service(add_user)
        .service(get_user)
        .service(edit_user)
        .service(delete_user))
        .bind(("localhost", 8080))?
        .run()
        .await
}
