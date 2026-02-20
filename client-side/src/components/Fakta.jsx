import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import circleSvg from '../assets/circle.svg'

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

  return (
    <section id="fakta" className="relative py-24 bg-primary overflow-hidden">
      {/* Decorative circles */}
      <img src={circleSvg} alt="" aria-hidden className="absolute -bottom-16 -left-16 w-64 opacity-20 pointer-events-none" />
      <img src={circleSvg} alt="" aria-hidden className="absolute top-10 right-10 w-48 opacity-10 pointer-events-none" />

      <div className="relative z-[1] max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center justify-center border border-white/30 rounded-full px-6 py-2 text-light-blue font-bold tracking-widest uppercase text-xl">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-snug">
            Kenali sejarah, keunikan, dan pentingnya Laut Banda <br className="hidden sm:block" /> bagi masyarakat dan dunia.
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-3xl overflow-hidden border border-white/5 hover:border-accent/40 transition-colors"
            >
              {/* Question button */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
              >
                <span className={`text-sm sm:text-base font-medium transition-colors duration-200 ${openIndex === i ? 'text-dark' : 'text-dark group-hover:text-accent'}`}>
                  {item.q}
                </span>
                <span className={`flex-shrink-0 text-accent transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                  <ChevronDown size={20} />
                </span>
              </button>

              {/* Answer — uses grid-based accordion from index.css */}
              <div className={`accordion-body ${openIndex === i ? 'open' : ''}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 bg-light-blue text-dark text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
