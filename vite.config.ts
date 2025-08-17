import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  
  optimizeDeps: {
    include: ['react', 'react-dom', '@google/generative-ai'],
    exclude: ['lucide-react'],
  },
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-ui': ['framer-motion', '@headlessui/react', 'lucide-react'],
          'vendor-3d': ['@react-three/fiber', '@react-three/drei', 'three'],
          'vendor-ai': ['@google/generative-ai'],
          'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          'vendor-utils': ['zustand', 'date-fns', 'clsx'],
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'assets/css/[name]-[hash][extname]';
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name || '')) return 'assets/images/[name]-[hash][extname]';
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name || '')) return 'assets/fonts/[name]-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
  },
  
  server: {
    port: 3000,
    host: true,
  },
});
