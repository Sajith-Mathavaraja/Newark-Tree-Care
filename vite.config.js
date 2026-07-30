import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

import cssInjectedByJs from 'vite-plugin-css-injected-by-js';

const isNetlify = process.env.NETLIFY === 'true';
const base = isNetlify ? '/' : '/Newark-Tree-Care/';

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJs(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      base: base,
      scope: base,
      workbox: {
        // Cache all static assets (images, JS, CSS) for long periods
        // Safe: Vite content-hashes all filenames so stale cache is never an issue
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudinary-images-v1',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\/assets\/.+\.(jpg|jpeg|webp|avif|png|gif|svg)(\?.*)?$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache-v1',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // JS and CSS bundles — CacheFirst is safe because Vite hashes filenames on every build
            urlPattern: /\/assets\/.+\.(js|css)(\?.*)?$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources-v1',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-v1',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        // Avoid caching the root HTML so updates are always fresh
        navigateFallback: null,
        globPatterns: ['**/*.{js,css}'],
      },
      manifest: {
        name: 'Newark Tree Care',
        short_name: 'Newark Trees',
        description: 'Expert tree care services in Newark, CA',
        theme_color: '#064e3b',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: base,
        icons: [
          {
            src: 'assets/logo.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
          },
        ],
      },
    }),
  ],
  base: base,
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/compat/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/compat/jsx-runtime'
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
