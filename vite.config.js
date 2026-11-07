import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), react()],

  build: {
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true,
    // Strip console.log and debugger statements in production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
        passes: 2,
      },
    },
    rollupOptions: {
      output: {
        // Chunk splitting: vendor libs separate from app code (function form for Vite 8 / rolldown)
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor'
          }
        },
        // Content-hash filenames for long-term CDN caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Warn if any single chunk exceeds 500 KB
    chunkSizeWarningLimit: 500,
    // Generate source maps for production error tracking (optional: set false to skip)
    sourcemap: false,
  },

  // Dev-only: proxy API calls to local backend so CORS is never needed during development
  server: {
    proxy:
      mode !== 'production'
        ? {
            '/api': {
              target: 'http://localhost:5001',
              changeOrigin: true,
              secure: false,
            },
          }
        : {},
  },
}))
