export default defineNuxtConfig({
	modules: ["@nuxt/eslint", "@nuxt/devtools"],
	ssr: true,
	devtools: { enabled: true },
	app: {
		head: {
			title: "Jef Lee — Photography",
			meta: [
				{ name: "description", content: "Personal photography portfolio of Jef Lee. Natural light, portraits, and genuine human stories." },
			],
			link: [
				{ rel: "preconnect", href: "https://fonts.googleapis.com" },
				{ rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap",
				},
			],
		},
	},
	css: [
		"@/assets/styles/main.css",
	],
	runtimeConfig: {
		public: {
			apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://127.0.0.1:8000/api",
			storageBase: process.env.NUXT_PUBLIC_STORAGE_BASE || "http://127.0.0.1:8000/storage",
		},
	},
	future: {
		compatibilityVersion: 3,
	},
	compatibilityDate: "2024-11-01",
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	eslint: {
		config: {
			stylistic: {
				semi: true,
				quotes: "double",
				commaDangle: "always-multiline",
				indent: "tab",
			},
		},
	},
});
