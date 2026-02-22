import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

const transitionConfig = { duration: 0.3, ease: [0.22, 1, 0.36, 1] }

export default function Sidebar({ open, setOpen }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  // 1. Pantau Layar
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 2. KUNCIAN MATI SCROLL & GESER (DIPISAH TOTAL)
  useEffect(() => {
    const mainPage = document.getElementById('main-content');
    
    if (isMobile) {
      // ==========================================
      // LAYAR HP: HALAMAN MATI TOTAL (GAK GESER)
      // ==========================================
      if (mainPage) {
        // Paksa CSS tunduk pakai "important" supaya mustahil geser
        mainPage.style.setProperty('transform', 'none', 'important');
        mainPage.style.setProperty('transition', 'none', 'important');
      }

      if (open) {
        // Kunci mati scroll untuk sentuhan jari (Touch Action None)
        document.documentElement.style.setProperty('overflow', 'hidden', 'important');
        document.body.style.setProperty('overflow', 'hidden', 'important');
        document.body.style.setProperty('touch-action', 'none', 'important');
      } else {
        // Buka gembok kalau sidebar ditutup
        document.documentElement.style.removeProperty('overflow');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('touch-action');
      }

    } else {
      // ==========================================
      // LAYAR LAPTOP: HALAMAN BEBAS & BISA GESER
      // ==========================================
      document.documentElement.style.removeProperty('overflow');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('touch-action');

      if (mainPage) {
        mainPage.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
        mainPage.style.transform = open ? 'translateX(-320px)' : 'translateX(0px)';
      }
    }

    // Cleanup aman saat keluar komponen
    return () => {
      document.documentElement.style.removeProperty('overflow');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('touch-action');
      if (mainPage) {
        mainPage.style.removeProperty('transform');
        mainPage.style.removeProperty('transition');
      }
    };
  }, [open, isMobile]);

  return (
    <>
      {/* 3. BLUR OVERLAY (Nahan klik tembus ke belakang) */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            // Tambahan "overscroll-none" biar mentok gak bisa narik-narik layar
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-md overscroll-none"
          />
        )}
      </AnimatePresence>

      {/* 4. TOMBOL TOGGLE */}
      <motion.button
        onClick={() => setOpen(!open)}
        initial={false}
        animate={{ x: open && !isMobile ? -320 : 0 }}
        transition={transitionConfig}
        className="fixed top-1/2 right-0 -translate-y-1/2 z-[85] bg-secondary hover:bg-[#7CA1D3] rounded-l-2xl p-2.5 shadow-xl"
        aria-label={open ? 'Tutup berita' : 'Buka berita'}
      >
        <motion.img
          src={toggleSvg}
          alt=""
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6"
        />
      </motion.button>

      {/* 5. PANEL SIDEBAR (Numplek di paling atas) */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: open ? '0%' : '100%' }}
        transition={transitionConfig}
        // Tambahan "overscroll-contain" biar scroll di sidebar gak bocor ke belakang
        className="fixed inset-y-0 right-0 w-80 z-[90] bg-[#001123] border border-white shadow-2xl thin-scrollbar overflow-y-auto overscroll-contain"
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
                className="flex flex-col rounded-2xl bg-[#001123]/60 hover:bg-[#001123] border border-white/20 hover:border-blue-400/70 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-all duration-300 overflow-hidden group"
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