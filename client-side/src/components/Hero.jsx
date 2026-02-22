import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import backgroundHeader from '../assets/background-header.svg'
import ikanPari from '../assets/Ikan Pari-header.svg'

// 1. Siapkan Varian Animasi untuk Container (Pembungkus)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Jeda kemunculan antar kata/elemen (0.15 detik)
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

// 2. Siapkan Varian Animasi untuk tiap Kata & Paragraf
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  },
}

export default function Hero() {
  // Pecah teks menjadi array per kata
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
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,67,137,0.55)]/70 to-[#000000]/70 z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 min-h-[calc(100vh-8rem)]">

          {/* Left — Text */}
          {/* Ubah menjadi initial="hidden" dan animate="visible" untuk trigger variants */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-tight mb-6"
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}
            >
              {/* Render Baris Pertama */}
              {line1.map((word, i) => (
                <motion.span 
                  key={`line1-${i}`} 
                  variants={itemVariants} 
                  className="inline-block mr-[0.25em]" // mr-[0.25em] sebagai pengganti spasi
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {/* Render Baris Kedua */}
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
            
            {/* Paragraf ikut menggunakan itemVariants agar muncul setelah judul selesai */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl mx-auto lg:mx-0"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              Temukan keindahan bawah laut, keanekaragaman hayati, dan nilai sejarah
              Banda Neira sebagai bagian penting dari warisan maritim Indonesia.
            </motion.p>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }} // Delay disesuaikan agar pas dengan teks
          >
            <img
              src={ikanPari}
              alt="Ikan Pari"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg animate-float drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#flora"
        className="absolute bottom-8 left-1/2 text-accent animate-bounce-y z-10"
        aria-label="Scroll ke bawah"
      >
        <ChevronDown size={32} strokeWidth={2.5} />
      </a>
    </section>
  )
}