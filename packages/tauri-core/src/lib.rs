use std::sync::Mutex;

#[cfg(desktop)]
use tauri::{
	menu::{Menu, MenuItem},
	tray::TrayIconBuilder,
};
use tauri::{AppHandle, Manager, State};
use tauri::async_runtime::spawn;
use tokio::time::{sleep, Duration};

// ── Splashscreen coordination ───────────────────────────────

pub struct SetupState {
	pub frontend_task: bool,
	pub backend_task: bool,
}

impl SetupState {
	pub fn new() -> Self {
		Self {
			frontend_task: false,
			backend_task: false,
		}
	}
}

impl Default for SetupState {
	fn default() -> Self {
		Self::new()
	}
}

#[tauri::command]
async fn set_complete(
	#[allow(unused_variables)] app: AppHandle,
	state: State<'_, Mutex<SetupState>>,
	task: String,
) -> Result<(), String> {
	let mut state_lock = state.lock().map_err(|e| e.to_string())?;

	match task.as_str() {
		"frontend" => state_lock.frontend_task = true,
		"backend" => state_lock.backend_task = true,
		_ => return Err("Invalid task".to_string()),
	}

	println!("{} setup complete!", task);

	if state_lock.frontend_task && state_lock.backend_task {
		println!("All setup tasks complete, showing main window...");

		#[cfg(desktop)]
		{
			if let Some(splash) = app.get_window("splashscreen") {
				let _ = splash.destroy();
			}
			if let Some(main) = app.get_window("main") {
				let _ = main.show();
			}
		}
	}

	Ok(())
}

// ── Backend setup task ──────────────────────────────────────

pub async fn default_backend_setup(app: AppHandle) -> Result<(), ()> {
	println!("Performing backend setup...");
	sleep(Duration::from_secs(2)).await;
	println!("Backend setup complete!");

	set_complete(
		app.clone(),
		app.state::<Mutex<SetupState>>(),
		"backend".to_string(),
	)
	.await
	.ok();

	Ok(())
}

// ── Desktop tray ────────────────────────────────────────────

#[cfg(desktop)]
pub fn setup_tray(app: &tauri::App) -> tauri::Result<()> {
	let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
	let menu = Menu::with_items(app, &[&quit_i])?;

	let _tray = TrayIconBuilder::new()
		.menu(&menu)
		.show_menu_on_left_click(true)
		.icon(app.default_window_icon().unwrap().clone())
		.on_menu_event(|app, event| match event.id.as_ref() {
			"quit" => {
				app.exit(0);
			}
			other => {
				println!("menu item {} not handled", other);
			}
		})
		.build(app)?;

	Ok(())
}

// ── Pre-configured builder ──────────────────────────────────

/// Returns a `tauri::Builder` with all standard plugins and state pre-configured.
/// Use this when you need to add custom IPC commands or setup logic.
pub fn base_builder() -> tauri::Builder<tauri::Wry> {
	let builder = tauri::Builder::default()
		.manage(Mutex::new(SetupState::new()))
		.plugin(tauri_plugin_shell::init())
		.plugin(tauri_plugin_notification::init())
		.plugin(tauri_plugin_os::init())
		.plugin(tauri_plugin_fs::init())
		.plugin(tauri_plugin_store::Builder::new().build());

	#[cfg(debug_assertions)]
	let builder = builder.plugin(tauri_plugin_mcp_bridge::init());

	builder
}

// ── App config ──────────────────────────────────────────────

/// Optional brand-specific setup hook called during `tauri::Builder::setup`.
pub struct AppConfig {
	pub on_setup: Option<Box<dyn FnOnce(&mut tauri::App) -> Result<(), Box<dyn std::error::Error>> + Send>>,
}

impl Default for AppConfig {
	fn default() -> Self {
		Self { on_setup: None }
	}
}

// ── Full app runner ─────────────────────────────────────────

/// Build and run a Tauri app with all shared core functionality.
/// For brands with no custom IPC commands, this is the simplest entry point.
pub fn run(context: tauri::Context, config: AppConfig) {
	let on_setup = config.on_setup;

	base_builder()
		.invoke_handler(tauri::generate_handler![set_complete])
		.setup(move |app| {
			#[cfg(desktop)]
			setup_tray(app)?;

			if let Some(setup_fn) = on_setup {
				setup_fn(app)?;
			}

			spawn(default_backend_setup(app.handle().clone()));

			Ok(())
		})
		.run(context)
		.expect("error while running tauri application");
}
