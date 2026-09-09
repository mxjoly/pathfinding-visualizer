import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    // Bundles src/service-worker.js and injects the precache manifest into it,
    // the way create-react-app's workbox InjectManifest step used to.
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.js',
      injectRegister: 'auto',
      manifest: false, // public/manifest.json is already linked from index.html
    }),
  ],
  // Keep the create-react-app output directory so existing deploys still work.
  build: { outDir: 'build' },
  server: { port: 3000 },
});
