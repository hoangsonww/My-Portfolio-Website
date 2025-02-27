import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Set the root to your index.html
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
