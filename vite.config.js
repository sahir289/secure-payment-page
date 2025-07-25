import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/v1': {
        target: process.env.NEXT_PUBLIC_API_BASE_URL,
        changeOrigin: true,
        secure: false
      }
    }
  }
});
