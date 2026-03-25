import { useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobileRaf } from '../hooks/useViewportRaf'

import toggleSvg from '../assets/toggle-button-sidebar.webp'
import berita1 from '../assets/berita/Berita1.webp'
import berita2 from '../assets/berita/Berita 2.webp'
import berita3 from '../assets/berita/Berita3.webp'

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
  const isMobile = useIsMobileRaf(768)

  useEffect(() => {
    if (isMobile) {
      if (open) {
        document.documentElement.style.setProperty('overflow', 'hidden', 'important');
        document.body.style.setProperty('overflow', 'hidden', 'important');
        document.body.style.setProperty('touch-action', 'none', 'important');
      } else {
        document.documentElement.style.removeProperty('overflow');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('touch-action');
      }
    } else {
      document.documentElement.style.removeProperty('overflow');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('touch-action');
    }

    return () => {
      document.documentElement.style.removeProperty('overflow');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('touch-action');
    };
  }, [open, isMobile]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className={`fixed inset-0 z-[50] ${
              isMobile ? 'bg-black/60 backdrop-blur-md overscroll-none' : 'bg-transparent'
            }`}
          />
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        initial={false}
        animate={{ x: open && !isMobile ? -240 : 0 }}
        transition={transitionConfig}
        className="fixed top-1/2 right-0 -translate-y-1/2 z-[70] bg-secondary hover:bg-[#7CA1D3] active:bg-[#7CA1D3] rounded-l-2xl p-2 shadow-xl"
        aria-label={open ? 'Tutup berita' : 'Buka berita'}
      >
        <motion.img
          src={toggleSvg}
          alt=""
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-5"
        />
      </motion.button>

      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: open ? '0%' : '100%' }}
        transition={transitionConfig}
        // PERBAIKAN: Hapus overflow-y-auto di sini, ganti jadi flex flex-col
        className="fixed inset-y-0 right-0 w-60 z-[60] bg-[#001123] border-l border-white/20 shadow-2xl flex flex-col overscroll-contain"
      >
        {/* PERBAIKAN: Header dipisah dan diberi shrink-0 agar tidak menyusut dan tidak ikut di-scroll */}
        <div className="flex items-center justify-between px-4 pt-5 pb-2.5 border-b border-white/10 shrink-0 bg-[#001123] z-10 relative shadow-sm">
          <h5 className="text-[15px] font-bold text-white">Berita Terkini</h5>
          <button 
            onClick={() => setOpen(false)} 
            className="text-white/50 hover:text-white active:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* PERBAIKAN: Konten berita dibungkus flex-1 dan overflow-y-auto agar bagian ini saja yang nge-scroll */}
        <div className="flex-1 overflow-y-auto thin-scrollbar p-4 pb-8">
          <div className="flex flex-col gap-4">
            {newsItems.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col rounded-lg bg-[#001123]/60 hover:bg-[#7CA1D3] active:bg-[#7CA1D3] border border-white/20 hover:border-[#7CA1D3] active:border-[#7CA1D3] hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] active:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 overflow-hidden group mx-0.5"
              >
                <div className="w-full h-20 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 group-active:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-2 flex flex-col gap-1 bg-[#001123]/40">
                  <p className="text-[8px] text-accent font-semibold uppercase tracking-widest">{item.date}</p>
                  <h6 className="text-xs font-semibold text-white leading-tight line-clamp-2">
                    {item.title}
                  </h6>
                  <p className="text-[10px] text-white/50 leading-snug line-clamp-2 mt-0.5">
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