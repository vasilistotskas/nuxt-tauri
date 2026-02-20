use std::sync::Mutex;

#[cfg(desktop)]
use tauri::{
	menu::{Menu, MenuItem},
	tray::TrayIconBuilder
};
use tauri::{AppHandle, Manager, State};
use tauri::async_runtime::spawn;
use tokio::time::{sleep, Duration};

// Track completion of setup tasks
struct SetupState {
	frontend_task: bool,
	backend_task: bool,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default()
		.manage(Mutex::new(SetupState {
			frontend_task: false,
			backend_task: false,
		}))
		.invoke_handler(tauri::generate_handler![set_complete])
		.setup(|_app| {
			#[cfg(desktop)]
			{
				let quit_i = MenuItem::with_id(_app, "quit", "Quit", true, None::<&str>)?;
				let menu = Menu::with_items(_app, &[&quit_i])?;

				let _tray = TrayIconBuilder::new()
					.menu(&menu)
					.show_menu_on_left_click(true)
					.icon(_app.default_window_icon().unwrap().clone())
					.on_menu_event(|app, event| match event.id.as_ref() {
						"quit" => {
							app.exit(0);
						}
						other => {
							println!("menu item {} not handled", other);
						}
					})
					.build(_app)?;
			}

			// Spawn backend setup task
			spawn(setup(_app.handle().clone()));

			Ok(())
		})
		.plugin(tauri_plugin_shell::init())
		.plugin(tauri_plugin_notification::init())
		.plugin(tauri_plugin_os::init())
		.plugin(tauri_plugin_fs::init())
		.plugin(tauri_plugin_store::Builder::new().build());

	#[cfg(debug_assertions)]
	{
		builder = builder.plugin(tauri_plugin_mcp_bridge::init());
	}

	builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
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

	// Check if both tasks are done
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

async fn setup(app: AppHandle) -> Result<(), ()> {
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
