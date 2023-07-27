// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use tauri_plugin_autostart::MacosLauncher;
use window_vibrancy::{apply_acrylic, apply_vibrancy, NSVisualEffectMaterial};
use window_shadows::set_shadow;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            #[cfg(any(windows, target_os = "macos"))]
            set_shadow(&window, true).unwrap();

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
              .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
      
            #[cfg(target_os = "windows")]
            apply_acrylic(&window, Some((18, 18, 18, 125)))
              .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
      
            Ok(())
        })
        .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, Some(vec!["--flag1", "--flag2"])))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
