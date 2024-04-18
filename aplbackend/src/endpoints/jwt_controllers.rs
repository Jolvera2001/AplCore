use actix_web::{ HttpResponse, Responder, post, web::Data, web::Json };
use argon2::{ password_hash:: { rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString }, Argon2 };
use crate::models::{ LoginRequest, RegisterRequest };
use crate::database::{ get_user, register_user, MongoRepo };
use crate::auth_tools::jwt_utils::*;

#[post("/auth/login")]
async fn login(info: Json<LoginRequest>, db: Data<MongoRepo>) -> impl Responder {
    let login_request = LoginRequest {
        email: info.email.to_owned(),
        password: info.password.to_owned()
    };

    let user_detail = get_user(login_request, db).await;
    match user_detail {
        Ok(Some(user)) => {
            if verify_hash(info.password.to_owned(), user.password.to_owned()).await {
                match user.id {
                    Some(id) => {
                        let jwt = generate_jwt(&id.to_string());
                        let cookie = create_cookie(&jwt);
                        respond_with_cookie(cookie)
                    }
                    None => HttpResponse::BadRequest().body("Error getting user id")
                }
            } else {
                HttpResponse::Unauthorized().finish()
            }
        },
        Ok(None) => HttpResponse::Unauthorized().body("User not found"),
        error => HttpResponse::BadRequest().body(error.expect_err("Error getting user").to_string())
    }
}

#[post("/auth/register")]
async fn register(new_user: Json<RegisterRequest>, db: Data<MongoRepo>) -> impl Responder {
    let hashed_password = hash_password(new_user.password.to_owned()).await.expect("Error hashing password");
    let ready_user = RegisterRequest {
        name: new_user.name.to_owned(),
        password: hashed_password,
        email: new_user.email.to_owned(),
        role: new_user.role.to_owned(),
        age: new_user.age.to_owned()
    };
    let register_detail = register_user(ready_user, db).await;
    match register_detail {
        Ok(doc) => {
            let inserted_id = doc.inserted_id.to_string();
            let jwt = generate_jwt(&inserted_id);
            let cookie = create_cookie(&jwt);
            respond_with_cookie(cookie)
        }
        error => HttpResponse::BadRequest().body(error.expect_err("Error getting user").to_string())
    }
}

async fn hash_password(password: String) -> Result<String, argon2::password_hash::Error> {
    let salt = SaltString::generate(&mut OsRng);

    let argon2 = Argon2::default();
    let password_hash = argon2.hash_password(password.as_bytes(), &salt);
    match password_hash {
        Ok(h) => Ok(h.to_string()),
        Err(e) => Err(e)
    }
}

async fn verify_hash(password: String, recorded: String) -> bool {
    if let Ok(parsed_hash) = PasswordHash::new(&recorded) {
        return Argon2::default()
            .verify_password(password.as_bytes(), &parsed_hash)
            .is_ok();
    }
    false
}