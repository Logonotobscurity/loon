import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react', '@headlessui/react'],
          '3d-vendor': ['@react-three/fiber', '@react-three/drei', 'three'],
        },
      },
    },
    chunkSizeWarningLimit: 2000, // Increase limit to reduce noise
    target: 'es2020', // Modern browsers for better minification
  },
});
