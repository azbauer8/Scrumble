// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use tauri::{Menu, MenuItem, Submenu, CustomMenuItem};

fn main() {
    let open = CustomMenuItem::new("open".to_string(), "Open File").accelerator("cmdOrControl+O");
    let save = CustomMenuItem::new("save", "Save").accelerator("cmdOrControl+S");
    let save_as = CustomMenuItem::new("save_as", "Save As").accelerator("Shift+cmdOrControl+S");

    let file_menu = Submenu::new("File", Menu::new().add_item(open).add_item(save).add_item(save_as).add_native_item(MenuItem::Quit));

    let edit_menu = Submenu::new("Edit", Menu::new().add_native_item(MenuItem::Undo).add_native_item(MenuItem::Redo).add_native_item(MenuItem::Cut).add_native_item(MenuItem::Copy).add_native_item(MenuItem::Paste).add_native_item(MenuItem::SelectAll));
    
    let menu = Menu::new()
    .add_submenu(file_menu)
    .add_submenu(edit_menu);

    tauri::Builder::default()
    .menu(menu)
    .on_menu_event(|event| {
        match event.menu_item_id() {
            "save" => {
                let _ = event.window().emit("menu-event", "save-event").unwrap();
            }
            "save_as" => {
                let _ = event.window().emit("menu-event", "save_as-event").unwrap();
            }
            "open" => {
                let _ = event.window().emit("menu-event", "open-event").unwrap();
            }
          _ => {}
        }
      })
    .invoke_handler(tauri::generate_handler![save_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn save_file(path: String, content: String) {
    fs::write(path, content).unwrap();
}