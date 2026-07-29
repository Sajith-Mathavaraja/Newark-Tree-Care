import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Newark-Tree-Care/',
  server: {
    port: 3000,
    open: true
  }
});
