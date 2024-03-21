use actix_web::{get, App, HttpResponse, HttpServer, Responder };
use actix_web::web::get;

mod database;
mod endpoints;
mod models;

use endpoints::{ add_user, edit_user, get_user, delete_user };

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().json("Hello World!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new()
    .service(hello)
    .service(add_user)
    .service(get_user)
    .service(edit_user)
    .service(delete_user))
    .bind(("localhost", 8080))?
    .run()
    .await
}
