mod database;
mod endpoints;
mod models;

use actix_web::{get, App, HttpResponse, HttpServer, Responder };

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().json("Hello World!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new()
        .service(hello))
        .bind(("localhost", 8080))?
        .run()
        .await
}
