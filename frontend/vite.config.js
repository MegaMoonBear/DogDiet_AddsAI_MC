// File location: frontend/vite.config.js - Vite build tool configuration
// Configures how Vite bundles and serves the React application
// Used by: npm run dev (development server), npm run build (production build)

import { defineConfig } from 'vite'  // Import Vite configuration helper
import react from '@vitejs/plugin-react'  // Import React plugin for JSX/Fast Refresh support

// Vite configuration documentation: https://vite.dev/config/
export default defineConfig({
  plugins: [react()],  // Enable React plugin for JSX transformation and Hot Module Replacement (HMR)
  
  // Development server configuration
  server: {
    // Proxy API requests to backend server during development
    // This fixes CORS issues and allows /api/* requests to reach FastAPI on port 5000
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // FastAPI backend server address
        changeOrigin: true,  // Changes origin of the request to match target
        secure: false,  // Allow self-signed certificates (if any)
      }
    }
  }
  
  // Additional config options:
  // - build: { outDir: 'dist' } for production build output
  // - resolve: { alias: {...} } for import path shortcuts
})
