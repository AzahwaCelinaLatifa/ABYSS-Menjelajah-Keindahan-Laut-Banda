import { X } from 'lucide-react'
import { motion } from 'framer-motion' // Import motion wajib dipakai

// Sesuaikan path import gambar dengan folder Anda
import toggleSvg from '../assets/toggle-button-sidebar.svg'
import berita1 from '../assets/berita/Berita1.svg'
import berita2 from '../assets/berita/Berita 2.svg'
import berita3 from '../assets/berita/Berita3.svg'

const newsItems = [
  {
    img: berita1,
    alt: 'Gempa Laut Banda',
    date: 'Senin, 20 Oktober 2025',
    title: 'Gempa M5,2 Guncang Laut Banda Maluku, BMKG',
    excerpt: 'Gempa berkekuatan 5,2 terjadi di Laut Banda dengan kedalaman 60 km.',
    url: 'https://news.okezone.com/read/2025/10/20/340/3177870/gempa-m5-2-guncang-laut-banda-maluku-bmkg-akibat-deformasi-batuan',
  },
  {
    img: berita2,
    alt: 'BMKG Warning',
    date: 'Senin, 3 November 2025',
    title: 'BMKG Imbau Waspada Gelombang Tinggi di Laut Banda Timur',
    excerpt: 'BMKG Kendari mengeluarkan peringatan gelombang tinggi di perairan Laut Banda Timur.',
    url: 'https://sultra.antaranews.com/berita/261155/bmkg-ketinggian-gelombang-laut-banda-30-meter',
  },
  {
    img: berita3,
    alt: 'Kebakaran Kapal',
    date: 'Kamis, 16 Oktober 2025',
    title: 'Kebakaran Kapal BBM di Laut Banda',
    excerpt: 'Kebakaran kapal BBM di Laut Banda menyebabkan evakuasi cepat ABK oleh tim SAR.',
    url: 'https://regional.kompas.com/read/2025/10/16/203553778/kapal-angkut-bbm-terbakar-saat-pindahkan-muatan-di-laut-banda',
  },
]

// Pengaturan animasi agar mulus
const transitionConfig = { type: "spring", bounce: 0, duration: 0.4 }

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Tombol pakai <motion.button> */}
      <motion.button
        onClick={() => setOpen(!open)}
        animate={{ right: open ? 320 : 0 }}
        transition={transitionConfig}
        className="fixed top-1/2 -translate-y-1/2 z-[90] bg-secondary hover:bg-accent rounded-l-2xl p-2.5 shadow-xl"
        aria-label={open ? 'Tutup berita' : 'Buka berita'}
      >
        {/* Gambar icon pakai <motion.img> */}
        <motion.img
          src={toggleSvg}
          alt=""
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6"
        />
      </motion.button>

      {/* Panel Sidebar pakai <motion.aside> */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: open ? '0%' : '100%' }}
        transition={transitionConfig}
        className="fixed inset-y-0 right-0 w-80 z-[85] bg-card shadow-2xl thin-scrollbar overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mt-12 mb-6 border-b border-white/10 pb-3">
            <h5 className="text-lg font-bold text-white">Berita Terkini</h5>
            <button 
              onClick={() => setOpen(false)} 
              className="text-white/50 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {newsItems.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col rounded-2xl bg-secondary/60 hover:bg-secondary border border-white/10 transition-colors overflow-hidden group"
              >
                <div className="w-full h-40 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col gap-1.5">
                  <p className="text-[11px] text-accent font-medium">{item.date}</p>
                  <h6 className="text-sm font-semibold text-white leading-snug line-clamp-2">
                    {item.title}
                  </h6>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.aside>
    </>
  )
}