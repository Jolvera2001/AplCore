use actix_web::{ HttpResponse, Responder, HttpRequest, post, web::Data, web::Json };
use jsonwebtoken::{ encode, EncodingKey, Header };
use argon2::{ password_hash:: { rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString }, Argon2 };
use crate::models::{ Claims, LoginRequest, RegisterRequest, user_model };

#[post("/auth/login")]
async fn login(info: Json<LoginRequest>) -> impl Responder {

}

#[post("/auth/register")]
async fn register(new_user: Json<RegisterRequest>) -> impl Responder {

}

async fn hash_password(password: String) -> Result<String, argon2::Error> {
    let salt = SaltString::generate(&mut OsRng);

    let argon2 = Argon2::default();
    let password_hash = argon2.hash_password(password.as_bytes(), &salt)?.to_string();
    Ok(password_hash)
}

async fn verify_hash(password: String, recorded: String) -> bool {
    if let Ok(parsed_hash) = PasswordHash::new(&recorded) {
        return Argon2::default()
            .verify_password(password.as_bytes(), &parsed_hash)
            .is_ok();
    }
    false
}