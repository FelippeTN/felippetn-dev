import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* Duas entradas, não um router: o site é estático e o TCC é uma página de
   leitura independente. `tcc/index.html` vira `dist/tcc/index.html`, ou seja
   a URL /tcc/ funciona em qualquer host estático, sem regra de rewrite e sem
   somar react-router ao bundle da home. */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        tcc: 'tcc/index.html',
      },
    },
  },
})
