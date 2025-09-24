/** @type {import('tailwindcss').Config} */
module.exports = {
presets: [require('nativewind/preset')],
content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6D4AFF',
        secondary: '#EFE9FD',
        accent: '#2D2C3A',
        'text-muted': '#9D9D9D',
        bg: '#F9F9FB',
        info: '#3A2D84',
        success: '#2ECC71',
        danger: '#E74C3C'
      }
    },
  },
  plugins: [],
}

