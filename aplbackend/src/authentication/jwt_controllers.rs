use actix_web::{ web, HttpResponse, Responder, HttpRequest, post, web::Data, web::Json };
use jsonwebtoken::{ encode, EncodingKey, Header };

#[post("/auth/login")]
async fn login(info: Json<LoginRequest>) -> impl Responder {
    let claims = Claims {
        sub: info.username.clone(),
        exp: 100000
    };

    let token = encode(&Header::default(), &claims, &EncodingKey::from_secret("secret".as_ref()))
        .unwrap();

    http::Response::Ok().json(token)
}