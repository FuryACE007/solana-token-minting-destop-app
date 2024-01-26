// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Window;

#[tauri::command]
fn navigate_to_create_token(window: Window) {
    window
        .emit("navigate", "/createToken")
        .expect("failed to emit");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![navigate_to_create_token])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
