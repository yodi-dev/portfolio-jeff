export default defineNuxtConfig({
	modules: ["@nuxt/eslint", "@nuxt/devtools"],
	devtools: { enabled: true },
	ssr: true,
	future: {
		compatibilityVersion: 3,
	},
	compatibilityDate: "2024-11-01",
	runtimeConfig: {
		public: {
			apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://127.0.0.1:8000/api",
			storageBase: process.env.NUXT_PUBLIC_STORAGE_BASE || "http://127.0.0.1:8000/storage",
		},
	},
	css: [
		"@/assets/styles/main.css",
	],
	app: {
		head: {
			title: "Jef Studio — Photography Portfolio",
			meta: [
				{ name: "description", content: "Personal photography portfolio by Jef" },
			],
		},
	},
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
