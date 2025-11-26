<p align="center">
    <img width="150" src="./public/logo.png" alt="logo">
</p>
<h1 align="center">Nuxt Tauri</h1>
<p align="center">
Made with <a href="https://nuxt.com">Nuxt 4</a> and <a href="https://v2.tauri.app">Tauri 2</a>
<br>
Build super fast desktop and mobile applications!
</p>

<br />

<p align="center">Powered by Nuxt 4</p>

<br />

## Technologies run-down

- Nuxt v4
- Tauri v2
- NuxtUI v4
- TailwindCSS v4
- Typescript
- ESLint
- Auto imports (for Tauri api too!)

## Functionalities

- Run shell commands from the app
- Send custom notifications to the client (remember to turn on/grant notifications in your computer settings)
- Display OS related informations
- Store and retrieve data locally
- Show tray icon
- Support all Nuxt functionalities (routing/layout/middleware/modules/etc...)

## Setup

  - Before running this app, you need to configure your environment with Rust. Take a look at the [Tauri docs](https://tauri.app/start/prerequisites).
  - This project enforces [bun](https://bun.sh). In order to use another package manager you need to update `package.json` and `tauri.conf.json`
  - The frontend runs on the usual port `3000` of Nuxt, the Tauri server uses the port `3001`. This settings are customizable in the `nuxt.config.ts` and `tauri.conf.json`.
  - Once ready, follow these commands:

  ```sh
  # use this template
  $ npx degit vassilistotskas/nuxt-tauri my-nuxtauri-app

  # go into the folder
  $ cd my-nuxtauri-app

  # install dependencies
  $ bun install

  # start the project
  $ bun run tauri:dev
  ```

  This will run the Nuxt frontend and will launch the Tauri window.

## Build

  ```sh
  $ bun run tauri:build
  ```

This command will generate the Nuxt static output and bundle the project under `src-tauri/target`.

## Debug

  ```sh
  $ bun run tauri:build:debug
  ```

The same Tauri bundle will generate under `src-tauri/target`, but with the ability to open the console.

## Android Build

### Prerequisites
- Android Studio with SDK installed
- Android NDK (install via Android Studio SDK Manager → SDK Tools → NDK)
- Rust Android targets:
  ```sh
  rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
  ```

### Setup
  ```sh
  # Initialize Android project (one-time)
  $ bun run tauri android init

  # Development (runs on emulator or connected device)
  $ bun run tauri android dev

  # Build APK/AAB for release
  $ bun run tauri android build
  ```

The APK will be generated at `src-tauri/gen/android/app/build/outputs/apk/`.

### Development Tips
- For faster iteration, use `bun run dev` with browser mobile view (DevTools → Toggle device toolbar)
- HMR on Android emulators can be unreliable due to network sandboxing
- Test final changes on emulator with `bun run tauri android dev`

## App Icons

To generate app icons for all platforms from your source logo:

```sh
$ bun run tauri icon public/logo.png
```

This generates all required icons in `src-tauri/icons/`:
- `icon.ico` (Windows)
- `icon.icns` (macOS)
- `*.png` files (Linux)
- Mobile icons are placed directly in `src-tauri/gen/android/` and `src-tauri/gen/apple/`

**Source image requirements:**
- Square dimensions (width == height)
- PNG or SVG with transparency
- Recommended: at least 1024×1024 for best quality

## Notes

- Tauri v2 brings some big refactors, such as packages names and permission management. New permissions have to be granted under `src-tauri/capabilities/main.json`
- Tauri functions are auto imported with the help of a custom module, named like `useTauri<LibraryName>`. If another Tauri plugin is added, then the module has to be updated to support its functions under `app/modules/tauri.ts`
- As per [documentation](https://tauri.app/start/frontend/nuxt/#checklist), Nuxt SSR must be disabled in order for Tauri to act as the backend. Still, all Nuxt goodies will be functional.
- NuxtUI is a very powerful UI library that consolidates design over the entire application. While version 4 is still in alpha, it includes old pro components of the v3.

## License

MIT License © 2025-PRESENT [VasilisTotskas](https://github.com/vasilistotskas)
