export default {
	content: [
		"./components/**/*.{vue,js}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./app.vue",
	],
	theme: {
		extend: {
			fontFamily: {
				serif: ['"Cormorant Garamond"', "Georgia", "serif"],
				sans: ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "sans-serif"],
			},
			colors: {
				canvas: "#FAF9F6", // Soft Japanese warm off-white / Washi paper tone
				ink: {
					DEFAULT: "#18181B", // Soft charcoal black
					light: "#3F3F46",
					muted: "#71717A",
					faint: "#A1A1AA",
				},
				line: "#E4E4E7", // Soft warm border
			},
		},
	},
	plugins: [],
};
