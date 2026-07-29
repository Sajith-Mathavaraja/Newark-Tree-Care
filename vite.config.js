import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

import cssInjectedByJs from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJs(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      base: '/Newark-Tree-Care/',
      scope: '/Newark-Tree-Care/',
      workbox: {
        // Cache all static assets (images, JS, CSS) for 30 days
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudinary-images-v1',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\/Newark-Tree-Care\/assets\/.+\.(jpg|jpeg|webp|avif|png|gif|svg)(\?.*)?$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache-v1',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\/Newark-Tree-Care\/assets\/.+\.(js|css)(\?.*)?$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources-v1',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
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
        start_url: '/Newark-Tree-Care/',
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
  base: '/Newark-Tree-Care/',
  server: {
    port: 3000,
    open: true
  }
});
