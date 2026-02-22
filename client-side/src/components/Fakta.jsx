import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqItems = [
  {
    q: 'Apa latar belakang geografi dan sejarah awal Laut Banda?',
    a: 'Sejarah awalnya terkait dengan masyarakat Banda yang sudah sejak ribuan tahun lalu hidup dari perdagangan dan pelayaran. Kepulauan Banda menjadi pusat penting karena merupakan satu-satunya penghasil pala dan fuli di dunia pada masa itu, sehingga menjadi pusat jalur rempah.',
  },
  {
    q: 'Bagaimana proses penaklukan Kepulauan Banda oleh Belanda?',
    a: 'Belanda di bawah pimpinan Jan Pieterszoon Coen melakukan penaklukan brutal terhadap Kepulauan Banda pada tahun 1621. Mereka membantai sebagian besar penduduk asli dan memperbudak sisanya untuk mengontrol monopoli perdagangan rempah-rempah, khususnya pala.',
  },
  {
    q: 'Apa dampak sosial dan budaya penaklukan Belanda bagi masyarakat Banda?',
    a: 'Penaklukan Belanda mengakibatkan genosida terhadap masyarakat asli Banda. Populasi yang awalnya sekitar 15.000 jiwa berkurang drastis hingga tinggal sekitar 1.000 jiwa. Budaya dan struktur sosial tradisional hancur, dan digantikan dengan sistem perkebunan kolonial yang eksploitatif.',
  },
  {
    q: 'Apa keunikan alam dan ekologi Laut Banda?',
    a: 'Laut Banda memiliki keanekaragaman hayati laut yang luar biasa tinggi, termasuk lebih dari 310 spesies terumbu karang dan ratusan spesies ikan. Perairan ini merupakan bagian dari Coral Triangle, pusat keanekaragaman hayati laut tertinggi di dunia, dengan ekosistem yang masih relatif terjaga.',
  },
  {
    q: 'Bagaimana peran Laut Banda dalam peta perdagangan dan kolonialisme dunia?',
    a: 'Laut Banda menjadi pusat perdagangan rempah global selama berabad-abad. Kontrol atas kepulauan ini memberikan kekuatan ekonomi dan politik yang sangat besar bagi kekuatan kolonial Eropa. Persaingan memperebutkan kontrol Banda menjadi salah satu pemicu kolonialisme di Nusantara.',
  },
]

export default function Fakta() {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex(prev => (prev === i ? null : i))

  const headerLine1 = "Kenali sejarah, keunikan, dan pentingnya Laut Banda".split(" ")
  const headerLine2 = "bagi masyarakat dan dunia.".split(" ")

  // === LOGIKA AUTO CLOSE SUPER KEBAL ===
  useEffect(() => {
    // 1. Tutup kalau user klik di luar area Fakta (misal klik Navbar)
    const handleClickOutside = (e) => {
      const faktaSection = document.getElementById('fakta');
      if (faktaSection && !faktaSection.contains(e.target)) {
        setOpenIndex(null);
      }
    };

    // 2. Tutup kalau user scroll menjauh dan area Fakta hilang dari layar
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setOpenIndex(null);
          }
        });
      },
      { threshold: 0 }
    );

    const faktaEl = document.getElementById('fakta');
    if (faktaEl) observer.observe(faktaEl);
    
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('hashchange', () => setOpenIndex(null));

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('hashchange', () => setOpenIndex(null));
      if (faktaEl) observer.unobserve(faktaEl);
    };
  }, []);

  return (
    <section id="fakta" className="relative py-24 bg-gradient-to-b from-[#010F1F]/50 via-accent/50 to-[#000204] overflow-hidden">
      
      <div className="relative z-[1] max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block border border-white/30 rounded-full px-6 py-2 text-[#7CA1D3] font-bold tracking-widest uppercase text-xl mb-6">
            FAQ
          </span>
          <motion.h2 
            variants={{
              hidden: { opacity: 1 },
              visible: { 
                opacity: 1, 
                transition: { staggerChildren: 0.08, delayChildren: 0.2 } 
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-4 text-3xl sm:text-4xl font-bold leading-tight text-white"
          >
            {headerLine1.map((word, i) => (
              <motion.span 
                key={`f1-${i}`} 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15 } }
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
            <br className="hidden sm:block" />
            {headerLine2.map((word, i) => (
              <motion.span 
                key={`f2-${i}`} 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15 } }
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        <div className="flex flex-col gap-5">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div 
                key={i} 
                className="w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={`transition-all duration-300 rounded-[2.5rem] overflow-hidden ${isOpen ? 'bg-[#EDF8FF] shadow-2xl' : 'bg-transparent'}`}>
                  
                  <button
                    onClick={() => toggle(i)}
                    className={`relative z-10 w-full flex items-center justify-between gap-4 px-8 py-5 text-left transition-all duration-300 
                      bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] 
                      text-[#010F1F] hover:text-[#7CA1D3] active:text-[#7CA1D3]
                      ${isOpen ? 'rounded-t-[2.5rem]' : 'rounded-[2.5rem]'}`}
                  >
                    <span className="text-sm sm:text-base font-semibold transition-colors duration-300">
                      {item.q}
                    </span>

                    <span className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown size={22} strokeWidth={2.5} />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                      >
                        <div className="w-full flex justify-center">
                          <div className="w-[94%] pt-5 pb-5 px-4">
                            <p className="text-[#010F1F]/80 text-sm sm:text-base leading-relaxed font-normal">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}