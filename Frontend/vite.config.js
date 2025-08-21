import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // This line is correct

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      // THIS IS THE MISSING PART!
      // Add your content paths here, just like you would in tailwind.config.js
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Adjust this path to wherever your components are
      ],
    }),
  ],
})