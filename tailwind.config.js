/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // ✅ This covers all files inside /src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
