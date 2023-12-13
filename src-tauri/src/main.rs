#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod setup;

fn main() {
    tauri::Builder::default()
        .setup(setup::init)
        .invoke_handler(tauri::generate_handler![setup::get_args])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
