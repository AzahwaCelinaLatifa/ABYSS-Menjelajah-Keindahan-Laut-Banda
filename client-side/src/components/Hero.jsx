import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import backgroundHeader from '../assets/background-header.svg'
import ikanPari from '../assets/Ikan Pari-header.svg'

export default function Hero() {
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
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,67,137,0.55)] to-[rgba(0,17,35,0.65)] z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 min-h-[calc(100vh-8rem)]">

          {/* Left — Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-tight mb-6"
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}
            >
              Menjelajahi Keindahan
              <br />
              Laut Banda
            </h1>
            <p
              className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl mx-auto lg:mx-0"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              Temukan keindahan bawah laut, keanekaragaman hayati, dan nilai sejarah
              Banda Neira sebagai bagian penting dari warisan maritim Indonesia.
            </p>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
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
