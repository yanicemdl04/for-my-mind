import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // ou le chemin approprié
  server: {
    port: 3001, // ou tout autre port libre
    strictPort: true, // Évite le basculement automatique vers un autre port
  },
  plugins: [react()],
});