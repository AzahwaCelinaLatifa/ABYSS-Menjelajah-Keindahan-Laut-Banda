/**
 * tailwind.config.js
 *
 * NOTE: Proyek ini menggunakan Tailwind CSS v4 dengan @tailwindcss/vite.
 * Di Tailwind v4, konfigurasi utama (warna, font, dll.) dilakukan
 * langsung di dalam file src/index.css menggunakan blok @theme {}.
 * File ini disediakan sebagai referensi kompatibilitas.
 *
 * Konfigurasi konten (content scanning) ditangani otomatis
 * oleh plugin @tailwindcss/vite — tidak perlu array "content" manual.
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
