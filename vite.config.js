import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 📘 Sur GitHub Pages, le site est servi à l'adresse https://alex8776.github.io/ATEF/
  // "base" indique à Vite ce sous-dossier, pour que les images, le CSS et le JS
  // soient cherchés au bon endroit. (Si tu changes le nom du dépôt, change-le ici aussi.)
  base: '/ATEF/',
})
