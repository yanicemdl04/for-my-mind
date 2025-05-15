import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
      port: 3001, // ou tout autre port libre
      strictPort: true, // Évite le basculement automatique vers un autre port
    }
  })