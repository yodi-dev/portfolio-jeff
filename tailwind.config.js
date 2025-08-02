export default {
  darkMode: 'class', 
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#a7d9a2', 
          DEFAULT: '#4CAF50', 
          dark: '#357a38' 
        },
        background: {
          light: '#ffffff',
          dark: '#121212'
        },
        text: {
          light: '#1F2937', 
          dark: '#F3F4F6',
        }
      }
    }
  },
  plugins: []
}
