use actix_web::{ HttpResponse, Responder, HttpRequest, post, web::Data, web::Json };
use jsonwebtoken::{ encode, EncodingKey, Header };
use argon2::{ password_hash:: { rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString }, Argon2 };
use crate::models::{ Claims, LoginRequest, RegisterRequest, user_model };
use crate::database::{ get_user, register_user, MongoRepo };

#[post("/auth/login")]
async fn login(info: Json<LoginRequest>, db: Data<MongoRepo>) -> impl Responder {
    let login_request = LoginRequest {
        name: info.name.to_owned(),
        password: info.password.to_owned()
    };

    let user = get_user(login_request, db).await;
    match user {
        Some(user) => {
            if  verify_hash(info.password.to_owned(), user.password.to_owned()).await {
                // TODO: do JWT Stuff
            } else {
                HttpResponse::Unauthorized().finish()
            }
        }
        error => HttpResponse::BadRequest().json(error)
    }
}

#[post("/auth/register")]
async fn register(new_user: Json<RegisterRequest>, db: Data<MongoRepo>) -> impl Responder {
    let hashed_password = hash_password(new_user.password.to_owned());
    let ready_user = RegisterRequest {
        name: new_user.name.to_owned(),
        password: hashed_password,
        email: new_user.email.to_owned(),
        role: new_user.role.to_owned(),
        age: new_user.age.to_owned()
    };
    let register_detail = register_user(ready_user, db).await;
    match register_detail {
        //TODO
    }
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