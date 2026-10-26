export default defineNuxtConfig({
	modules: ["@nuxt/eslint", "@nuxt/devtools"],
	ssr: true,
	devtools: { enabled: true },
	app: {
		head: {
			title: "Jeff Lee — Photography Portfolio",
			meta: [
				{ name: "description", content: "Personal photography portfolio of Jeff Lee. Telling real stories through natural light and heartfelt moments." },
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
