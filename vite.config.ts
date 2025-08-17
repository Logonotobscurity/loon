import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
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
      },
    },
    chunkSizeWarningLimit: 1000,
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,
  },
  
  server: {
    port: 3000,
    host: true,
  },
});
