import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Served from a custom domain (marcchen.net) at the root, so base stays '/'.
// If you ever move to https://<user>.github.io/<repo>/ instead of a custom
// domain, change this to '/<repo>/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
