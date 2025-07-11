// TODO: Implement commands here

use tauri::command;

#[command]
pub(crate) fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust.", name)
}

#[derive(serde::Serialize)]
pub struct UserInfo {
    pub name: String,
    pub email: String,
    pub role: String,
}

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("unexpected request body")]
    RequestBodyMustBeRaw,
    #[error("missing `{0}` header")]
    MissingHeader(&'static str),
}
impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

#[command]
pub fn fetch_user_profile() -> Result<UserInfo, Error> {
    let data = UserInfo {
        name: "1234".to_string(),
        email: "1234".to_string(),
        role: "1234".to_string(),
    };

    Ok(data)
}
