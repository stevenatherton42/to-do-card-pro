import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    lib: {
      entry: 'src/ha-todo-card.ts',
      formats: ['es'],
      fileName: 'ha-todo-card',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'lit'],
    },
  },
});