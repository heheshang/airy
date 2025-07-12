// TODO: Implement commands here

use airy_core::Result;
use tauri::command;

#[command]
pub(crate) fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust.", name)
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct UserInfo {
    pub name: String,
    pub email: String,
    pub role: String,
}

#[command]
pub(crate) fn fetch_user_profile() -> Result<UserInfo> {
    let data = UserInfo {
        name: "1234".to_string(),
        email: "1234".to_string(),
        role: "1234".to_string(),
    };

    Ok(data)
}


