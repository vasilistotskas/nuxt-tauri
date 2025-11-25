export default defineNuxtConfig({
	modules: [
		"@vueuse/nuxt",
		"@nuxt/ui",
		"nuxt-svgo",
		"reka-ui/nuxt",
		"@nuxt/eslint"
	],
	app: {
		head: {
			title: "Nuxtor",
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
			meta: [
				{ name: "format-detection", content: "no" }
			]
		},
		pageTransition: {
			name: "page",
			mode: "out-in"
		},
		layoutTransition: {
			name: "layout",
			mode: "out-in"
		}
	},
	css: [
		"@/assets/css/main.css"
	],
	svgo: {
		autoImportPath: "@/assets/"
	},
	ssr: false,
	dir: {
		modules: "app/modules"
	},
	imports: {
		presets: [
			{
				from: "zod",
				imports: [
					"z",
					{
						name: "infer",
						as: "zInfer",
						type: true
					}
				]
			}
		]
	},
	vite: {
		clearScreen: false,
		envPrefix: ["VITE_", "TAURI_"],
		server: {
			strictPort: true,
			hmr: {
				protocol: "ws",
				host: process.env.TAURI_DEV_HOST || "0.0.0.0",
				port: 3000
			},
			watch: {
				ignored: ["**/src-tauri/**"]
			}
		}
	},
	devServer: {
		host: "0.0.0.0"
	},
	router: {
		options: {
			scrollBehaviorType: "smooth"
		}
	},
	eslint: {
		checker: true,
		config: {
			standalone: false
		}
	},
	devtools: {
		enabled: false
	},
	experimental: {
		typedPages: true
	},
	typescript: {
		strict: true,
		typeCheck: true
	},
	compatibilityDate: "latest"
});
