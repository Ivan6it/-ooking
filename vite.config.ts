import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    hmr: { overlay: true },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@svgr': path.resolve(__dirname, './src/svgr'),
    },
  },
});
