#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod setup;

fn main() {
    tauri::Builder::default()
        .setup(setup::init)
        .invoke_handler(tauri::generate_handler![open_location])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}



use std::fs;
#[cfg(target_os = "linux")]
use std::{fs::metadata, path::PathBuf};
use std::path::PathBuf;
use std::process::Command;
#[cfg(target_os = "linux")]
use fork::{daemon, Fork}; // dep: fork = "0.1"

#[tauri::command]
fn open_location(path: String) {
  #[cfg(target_os = "windows")]
  {
    Command::new("explorer")
        .args(["/select,", &path]) // The comma after select is not a typo
        .spawn()
        .unwrap();
  }

  #[cfg(target_os = "linux")]
  {
    if path.contains(",") {
      // see https://gitlab.freedesktop.org/dbus/dbus/-/issues/76
      let new_path = match metadata(&path).unwrap().is_dir() {
        true => path,
        false => {
          let mut path2 = PathBuf::from(path);
          path2.pop();
          path2.into_os_string().into_string().unwrap()
        }
      };
      Command::new("xdg-open")
          .arg(&new_path)
          .spawn()
          .unwrap();
    } else {
      if let Ok(Fork::Child) = daemon(false, false) {
        Command::new("dbus-send")
            .args(["--session", "--dest=org.freedesktop.FileManager1", "--type=method_call",
                  "/org/freedesktop/FileManager1", "org.freedesktop.FileManager1.ShowItems",
                  format!("array:string:\"file://{path}\"").as_str(), "string:\"\""])
            .spawn()
            .unwrap();
      }
    }
  }

  #[cfg(target_os = "macos")]
  {
    Command::new("open")
        .args(["-R", &path])
        .spawn()
        .unwrap();
  }
}