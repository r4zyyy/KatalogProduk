import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' agar aset tetap terbaca saat di-host di subfolder
export default defineConfig({
  base: './',
  plugins: [react()],
});
