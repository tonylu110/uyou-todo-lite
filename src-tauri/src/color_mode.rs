#[tauri::command]
pub fn set_color_theme(color: String) -> String {
    format!("hello, {}", color)
}