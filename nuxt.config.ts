export default defineNuxtConfig({
	modules: ["@nuxt/eslint", '@nuxt/devtools'],
	devtools: { enabled: true },
	ssr: true,
	compatibilityDate: "2024-11-01",
  css: [
	"@picocss/pico",
	'@/assets/css/main.css'
],
postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
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
