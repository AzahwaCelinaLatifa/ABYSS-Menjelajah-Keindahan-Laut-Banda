# ABYSS - Menjelajah Keindahan Laut Banda

Website interaktif untuk menampilkan pesona alam, flora, fauna, dan lokasi Laut Banda, Maluku Tengah, Indonesia. Versi produksi dari proyek ini dapat diakses secara langsung melalui tautan berikut: https://abyss-banda.vercel.app

## Deskripsi

Proyek ini dibangun untuk memberikan pengalaman visual yang optimal terkait Laut Banda. Antarmuka dirancang secara responsif agar menyesuaikan dengan berbagai ukuran layar. Fokus utama dari pengembangan ini adalah manajemen performa animasi pada antarmuka pengguna, terutama saat diakses melalui perangkat mobile.

## Fitur Utama

- Latar belakang interaktif yang merespons pergerakan kursor dan interaksi pengguna, menciptakan nuansa visual kedalaman laut yang dinamis.
- Desain responsif yang menyesuaikan ukuran layar secara otomatis.
- Animasi transisi halaman dan elemen visual.
- Peta lokasi interaktif terintegrasi.
- Formulir kontak fungsional.

## Optimasi Performa Mobile

Proyek ini menerapkan beberapa teknik optimasi untuk menjaga stabilitas frame rate pada perangkat mobile.

- Custom Viewport Hook: Menggunakan requestAnimationFrame dan useSyncExternalStore untuk mendeteksi perubahan ukuran layar tanpa mengganggu siklus render utama React.
- Adaptive Animation: Menonaktifkan animasi berbasis scroll (whileInView) dari Framer Motion pada perangkat mobile untuk mengurangi beban prosesor.
- Optimasi Latar Belakang: Penyesuaian render intensitas efek visual pada latar belakang interaktif agar komputasi grafis tetap ringan saat diakses melalui perangkat seluler.
- Touch-Friendly Hover: Menyesuaikan implementasi efek hover CSS untuk menghindari kendala sticky hover pada perangkat dengan layar sentuh.

## Teknologi Utama

- React (Vite)
- Tailwind CSS
- Framer Motion
- Lucide React

## Cara Menjalankan Proyek Lokal

Ikuti langkah berikut untuk menjalankan proyek ini di perangkat Anda.

1. Lakukan clone repositori ini ke komputer Anda.
2. Buka terminal dan arahkan ke folder proyek tersebut.
3. Jalankan perintah `npm install` untuk mengunduh semua dependensi yang dibutuhkan.
4. Jalankan perintah `npm run dev` untuk memulai development server lokal.
5. Buka browser dan akses tautan http://localhost:5173.
