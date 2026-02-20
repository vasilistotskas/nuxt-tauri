#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri_core::run(tauri::generate_context!(), tauri_core::AppConfig::default());
}
