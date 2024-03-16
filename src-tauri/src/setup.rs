use tauri::{App, Manager};
use window_shadows::set_shadow;
use window_vibrancy::{self};

#[cfg(target_os = "macos")]
pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    use window_vibrancy::NSVisualEffectMaterial;

    let win = app.get_window("scrumble").unwrap();
    set_shadow(&win, true).unwrap();
    window_vibrancy::apply_vibrancy(&win, NSVisualEffectMaterial::HudWindow, None, None)
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
    Ok(())
}

#[cfg(target_os = "windows")]
pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let win = app.get_window("scrumble").unwrap();
    set_shadow(&win, true).unwrap();
    window_vibrancy::apply_mica(&win)
        .expect("Unsupported platform! 'apply_mica' is only supported on Windows 10.0.21996");
    Ok(())
}

#[cfg(target_os = "linux")]
pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    Ok(())
}
