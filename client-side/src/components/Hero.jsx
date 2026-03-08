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

export default function Hero() {
  const line1 = "Menjelajahi Keindahan".split(" ")
  const line2 = "Laut Banda".split(" ")

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center text-white overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at center, rgba(10,22,40,0) 0%, rgba(5,15,30,0.7) 70%, rgba(0,0,0,0.85) 100%), 
          url(${backgroundHeader}) center / cover no-repeat
        `,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,67,137,0.55)]/70 to-[#000000]/70 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-24 pb-16">
        
        {/* GAP dikecilin jadi gap-6 buat HP biar makin rapet */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-16 min-h-[calc(100vh-8rem)]">

          {/* flex-1 diganti jadi w-full lg:flex-1 biar gak maksa belah layar 50:50 di HP */}
          <motion.div
            className="w-full lg:flex-1 text-center lg:text-left flex flex-col items-center lg:items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-tight mb-4 sm:mb-6"
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}
            >
              {line1.map((word, i) => (
                <motion.span 
                  key={`line1-${i}`} 
                  variants={itemVariants} 
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {line2.map((word, i) => (
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
              className="text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed max-w-sm sm:max-w-md lg:max-w-xl"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              Temukan keindahan bawah laut, keanekaragaman hayati, dan nilai sejarah
              Banda Neira sebagai bagian penting dari warisan maritim Indonesia.
            </motion.p>
          </motion.div>

          {/* Sama di sini, w-full lg:flex-1 biar ngekor teks di atasnya aja */}
          <motion.div
            className="w-full lg:flex-1 flex justify-center mt-2 lg:mt-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            <img
              src={ikanPari}
              alt="Ikan Pari"
              className="w-full h-auto object-contain max-w-[240px] sm:max-w-[300px] md:max-w-md lg:max-w-lg animate-float drop-shadow-2xl"
            />
          </motion.div>

        </div>
      </div>

      <a
        href="#flora"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent animate-bounce-y z-10"
        aria-label="Scroll ke bawah"
      >
        <ChevronDown size={32} strokeWidth={2.5} />
      </a>
    </section>
  )
}