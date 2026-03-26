import { memo, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import backgroundHeader from '../assets/background-header.webp'
import ikanPari from '../assets/Ikan Pari-header.webp'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const heroLine1 = 'Menjelajahi Keindahan'.split(' ')
const heroLine2 = 'Laut Banda'.split(' ')

const fishInitial = { opacity: 0, scale: 0.85 }
const fishAnimate = { opacity: 1, scale: 1 }
const fishTransition = { duration: 0.8, delay: 0.6, ease: 'easeOut' }

const fishLoopAnimate = { y: [-15, 15, -15], rotate: [-2, 2, -2] }
const fishLoopTransition = { duration: 6, repeat: Infinity, ease: 'easeInOut' }

const arrowAnimate = { y: [0, 10, 0] }
const arrowTransition = { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }

function Hero() {
  const handleScrollToFlora = useCallback((e) => {
    e.preventDefault()
    const targetElement = document.getElementById('flora')
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section
      id="beranda"
      className="relative pt-24 md:pt-28 pb-16 min-h-[100dvh] md:min-h-[600px] md:h-[100vh] md:max-h-[850px] lg:max-h-[950px] flex items-center text-white overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundHeader})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#004389]/60 via-[#030A14]/80 to-[#0A1628] z-0 pointer-events-none" />

      {/* PERBAIKAN DI SINI: Shadow bawah dibuat lebih tipis (h-24) dan transisinya dihaluskan (tanpa via) */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A1628] to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 w-full mt-8 md:mt-0">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-8 lg:gap-16">

          {/* Teks Hero */}
          <motion.div
            className="w-full md:flex-1 text-center md:text-left flex flex-col items-center md:items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1
              className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.5rem] xl:text-6xl font-bold leading-tight mb-4 sm:mb-6"
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}
            >
              {heroLine1.map((word, i) => (
                <motion.span 
                  key={`line1-${i}`} 
                  variants={itemVariants} 
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {heroLine2.map((word, i) => (
                <motion.span 
                  key={`line2-${i}`} 
                  variants={itemVariants} 
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-base lg:text-lg text-white/85 leading-relaxed max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              Temukan keindahan bawah laut, keanekaragaman hayati, dan nilai sejarah
              Banda Neira sebagai bagian penting dari warisan maritim Indonesia.
            </motion.p>
          </motion.div>

          {/* Gambar Ikan Pari */}
          <motion.div
            className="w-full md:flex-1 flex justify-center mt-6 md:mt-0"
            initial={fishInitial}
            animate={fishAnimate}
            transition={fishTransition}
          >
            <motion.img
              src={ikanPari}
              alt="Ikan Pari"
              loading="eager"
              decoding="async"
              animate={fishLoopAnimate}
              transition={fishLoopTransition}
              className="w-full h-auto object-contain max-w-[240px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-lg drop-shadow-2xl pointer-events-none will-change-transform transform-gpu"
            />
          </motion.div>

        </div>
      </div>

      {/* Tanda Panah Scroll */}
      <motion.a
        href="#flora"
        onClick={handleScrollToFlora}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-[#7CA1D3] z-[100] p-4 cursor-pointer pointer-events-auto hover:text-white transition-colors duration-300 flex items-center justify-center"
        aria-label="Scroll ke bawah"
        animate={arrowAnimate}
        transition={arrowTransition}
      >
        <ChevronDown size={32} strokeWidth={2.5} />
      </motion.a>
    </section>
  )
}

export default memo(Hero)