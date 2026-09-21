import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // three.js is the heaviest dependency here and it is below the fold; the
  // lazy import of src/three/TableScene keeps it out of the entry chunk.
});
