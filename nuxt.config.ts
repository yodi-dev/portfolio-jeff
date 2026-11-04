export default defineNuxtConfig({
	modules: ["@nuxt/eslint", "@nuxt/devtools"],
	ssr: true,
	devtools: { enabled: true },
	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
			title: "Jef Lee — Photography",
			titleTemplate: (chunk?: string) => {
				if (!chunk) return "Jef Lee — Portrait & Documentary Photography";
				return chunk.includes("Jef Lee") ? chunk : `${chunk} — Jef Lee Photography`;
			},
			meta: [
				{ name: "description", content: "Personal photography portfolio of Jef Lee. Natural light, portraits, and genuine human stories." },
				{ name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
				{ name: "author", content: "Jef Lee" },
				{ name: "publisher", content: "Jef Lee Photography" },
				{ name: "theme-color", content: "#FAF9F6" },
				{ property: "og:site_name", content: "Jef Lee Photography" },
				{ property: "og:type", content: "website" },
				{ property: "og:locale", content: "en_US" },
				{ property: "og:title", content: "Jef Lee — Photography" },
				{ property: "og:description", content: "Personal photography portfolio of Jef Lee. Natural light, portraits, and genuine human stories." },
				{ property: "og:image", content: "https://jeflee.photography/images/preview3.jpeg" },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: "Jef Lee — Photography" },
				{ name: "twitter:description", content: "Personal photography portfolio of Jef Lee. Natural light, portraits, and genuine human stories." },
				{ name: "twitter:image", content: "https://jeflee.photography/images/preview3.jpeg" },
			],
			link: [
				{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg?v=3" },
				{ rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png?v=3" },
				{ rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png?v=3" },
				{ rel: "shortcut icon", href: "/favicon.ico?v=3" },
				{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png?v=3" },
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
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://jeflee.photography",
			apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8000/api",
			storageBase: process.env.NUXT_PUBLIC_STORAGE_BASE || "http://localhost:8000/storage",
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
