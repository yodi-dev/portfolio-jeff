/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // pakai class .dark untuk aktifkan dark mode
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
          light: '#a7d9a2', // hijau muda
          DEFAULT: '#4CAF50', // hijau utama
          dark: '#357a38' // hijau gelap
        },
        background: {
          light: '#ffffff',
          dark: '#121212'
        },
        text: {
          light: '#333333',
          dark: '#e0e0e0'
        }
      }
    }
  },
  plugins: []
}
