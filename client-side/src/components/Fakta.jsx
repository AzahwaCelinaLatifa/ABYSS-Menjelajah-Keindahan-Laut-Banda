import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqItems = [
  { q: 'Apa latar belakang geografi dan sejarah awal Laut Banda?', a: 'Sejarah awalnya terkait dengan masyarakat Banda yang sudah sejak ribuan tahun lalu hidup dari perdagangan dan pelayaran. Kepulauan Banda menjadi pusat penting karena merupakan satu-satunya penghasil pala dan fuli di dunia pada masa itu.' },
  { q: 'Bagaimana proses penaklukan Kepulauan Banda oleh Belanda?', a: 'Belanda di bawah pimpinan Jan Pieterszoon Coen melakukan penaklukan brutal pada tahun 1621 untuk mengontrol monopoli perdagangan rempah-rempah, khususnya pala.' },
  { q: 'Apa dampak sosial dan budaya penaklukan Belanda bagi masyarakat Banda?', a: 'Penaklukan ini mengakibatkan genosida penduduk asli. Populasi berkurang drastis, budaya tradisional hancur, dan digantikan sistem perkebunan kolonial yang eksploitatif.' },
  { q: 'Apa keunikan alam dan ekologi Laut Banda?', a: 'Memiliki keanekaragaman hayati laut luar biasa dengan lebih dari 310 spesies terumbu karang. Merupakan bagian dari Coral Triangle, pusat keragaman hayati laut tertinggi dunia.' },
  { q: 'Bagaimana peran Laut Banda dalam peta perdagangan dan kolonialisme dunia?', a: 'Menjadi pusat perdagangan rempah global yang memberikan kekuatan ekonomi besar bagi Eropa, memicu persaingan kolonial di Nusantara.' },
]

export default function Fakta() {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex(prev => (prev === i ? null : i))

  return (
    // PERBAIKAN 1: Hapus overflow-hidden dan warna background solid. 
    // Pakai bg-transparent agar ikan/animasi yang melilingi web bisa lewat bebas di sini.
    // PERBAIKAN RESPONSIVE: Hapus min-h-screen dan ubah padding ke py-16 md:py-24 agar konsisten
    <section id="fakta" className="relative py-16 md:py-24 flex flex-col justify-center bg-transparent w-full z-10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 w-full flex flex-col items-center">
        
        {/* PERBAIKAN 2: Warna diganti ke Biru Terang (#38BDF8) */}
        <div className="mb-6">
          <span className="inline-block border border-[#7CA1D3]/50 rounded-full px-8 py-2 text-[#7CA1D3] font-bold tracking-widest uppercase text-sm md:text-base bg-[#7CA1D3]/5">
            FAQ
          </span>
        </div>
        
        {/* PERBAIKAN 3: max-w-4xl agar teks merentang panjang di layar besar, tidak ngumpul di tengah */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white text-center mb-10 w-full max-w-4xl">
          Kenali sejarah, keunikan, dan pentingnya Laut Banda bagi masyarakat dan dunia.
        </h2>

        {/* LIST FAQ: ONE PAGE LAYOUT */}
        <div className="w-full flex flex-col gap-3 max-w-4xl">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="w-full z-20">
                {/* PERBAIKAN 4: Style dikembalikan sesuai image_aa7be4.png 
                    (Gelap, border biru terang saat dibuka, text tetap putih) */}
                <div className={`transition-colors duration-300 rounded-[1.5rem] md:rounded-[2rem] border ${isOpen ? 'bg-[#0B1420] border-[#7CA1D3]' : 'bg-[#0B1420]/50 border-white/10 hover:border-white/20'}`}>
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-4 text-left text-white outline-none"
                  >
                    <span className="text-xs md:text-sm font-semibold tracking-wide">
                      {item.q}
                    </span>
                    <ChevronDown size={18} className={`flex-shrink-0 text-[#7CA1D3] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 md:px-8 pb-5 pt-0">
                          <p className="text-white/80 text-[11px] md:text-[13px] leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}