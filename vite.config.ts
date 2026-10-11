import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The local preview is opened through 127.0.0.1 in the in-app browser.
  // Bind explicitly to IPv4 loopback so HMR and refreshes reach the same app.
  server: {
    host: '127.0.0.1',
  },
})
