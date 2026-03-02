/**
 * postcss.config.js
 *
 * Untuk Tailwind v4 + Vite, pemrosesan Tailwind dilakukan oleh
 * plugin @tailwindcss/vite di vite.config.js.
 * File ini menyediakan autoprefixer untuk kompatibilitas CSS cross-browser.
 */
export default {
  plugins: {
    autoprefixer: {},
  },
}
