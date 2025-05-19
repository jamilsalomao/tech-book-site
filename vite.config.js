// vite.config.js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: '.',               // Define a raiz do projeto (onde está o index.html)
  build: {
    outDir: 'dist',        // Pasta de saída
  },
  server: {
    port: 5173,            // Porta local (padrão do Vite)
    open: true,            // Abre no navegador automaticamente
  },
  plugins: [    
    tailwindcss(),  
  ],
});
