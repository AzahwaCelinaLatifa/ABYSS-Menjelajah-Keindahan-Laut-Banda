import { useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import toggleSvg from '../assets/toggle-button-sidebar.svg'
import berita1 from '../assets/berita/Berita1.svg'
import berita2 from '../assets/berita/Berita 2.svg'
import berita3 from '../assets/berita/Berita3.svg'

const newsItems = [
  { img: berita1, date: 'Senin, 20 Oktober 2025', title: 'Gempa M5,2 Guncang Laut Banda Maluku, BMKG', excerpt: 'Gempa berkekuatan 5,2 terjadi di Laut Banda dengan kedalaman 60 km.', url: 'https://news.okezone.com/read/2025/10/20/340/3177870/gempa-m5-2-guncang-laut-banda-maluku-bmkg-akibat-deformasi-batuan' },
  { img: berita2, date: 'Senin, 3 November 2025', title: 'BMKG Imbau Waspada Gelombang Tinggi di Laut Banda Timur', excerpt: 'BMKG Kendari mengeluarkan peringatan gelombang tinggi di perairan Laut Banda Timur.', url: 'https://sultra.antaranews.com/berita/261155/bmkg-ketinggian-gelombang-laut-banda-30-meter' },
  { img: berita3, date: 'Kamis, 16 Oktober 2025', title: 'Kebakaran Kapal BBM di Laut Banda', excerpt: 'Kebakaran kapal BBM di Laut Banda menyebabkan evakuasi cepat ABK oleh tim SAR.', url: 'https://regional.kompas.com/read/2025/10/16/203553778/kapal-angkut-bbm-terbakar-saat-pindahkan-muatan-di-laut-banda' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Buka sidebar berita"
        className="fixed top-1/2 -translate-y-1/2 right-0 z-[90] transition hover:opacity-80 active:scale-95"
      >
        <img src={toggleSvg} alt="Toggle sidebar" className="w-10 h-10" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.aside
              key="sidebar-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="fixed top-0 right-0 z-[95] h-full w-80 bg-primary border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <h2 className="text-base font-bold tracking-wide text-white">Berita Terkini</h2>
                <button onClick={() => setOpen(false)} className="text-light-blue hover:text-white transition" aria-label="Tutup sidebar">
                  <X size={20} />
                </button>
              </div>

              {/* News list */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-accent/40">
                {newsItems.map((n, i) => (
                  <a
                    key={i}
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 items-start rounded-2xl bg-card p-3 border border-white/5 hover:border-accent/40 transition group"
                  >
                    <img
                      src={n.img}
                      alt={n.title}
                      className="w-20 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-light-blue/50">{n.date}</span>
                      <span className="text-xs font-medium leading-snug text-light-blue group-hover:text-white transition line-clamp-2">
                        {n.title}
                      </span>
                      <span className="text-[10px] leading-snug text-light-blue/60 line-clamp-2">
                        {n.excerpt}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
