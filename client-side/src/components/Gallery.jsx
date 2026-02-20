import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import circleSvg from '../assets/circle.svg'

/* ============================================================
   Import semua gambar galeri
   ============================================================ */
import menyelam  from '../assets/galeri/Menyelam (Scuba Diving).svg'
import gunungApi from '../assets/galeri/Gunung Api Banda.svg'
import lumbaLumba from '../assets/galeri/Tur Lumba-Lumba.svg'
import benteng   from '../assets/galeri/Benteng Belgica.svg'
import bungHatta from '../assets/galeri/Rumah Pengasingan Bung Hatta.svg'
import pulauHatta from '../assets/galeri/Pulau Hatta.svg'
import gerejaT   from '../assets/galeri/Gereja Tua Banda Neira.svg'
import istanaMini from '../assets/galeri/Istana Mini.svg'
import lavaFlow  from '../assets/galeri/Lava Flow.svg'
import parigi    from '../assets/galeri/Monumen Parigi Rante.svg'
import perkebun  from '../assets/galeri/Perkebunan Pala.svg'
import pulauRun  from '../assets/galeri/Pulau Run.svg'

const galeriItems = [
  { img: menyelam,   caption: 'Menyelam (Scuba Diving)' },
  { img: gunungApi,  caption: 'Gunung Api Banda' },
  { img: lumbaLumba, caption: 'Tur Lumba-Lumba' },
  { img: benteng,    caption: 'Benteng Belgica' },
  { img: bungHatta,  caption: 'Rumah Pengasingan Bung Hatta' },
  { img: pulauHatta, caption: 'Pulau Hatta' },
  { img: gerejaT,    caption: 'Gereja Tua Banda Neira' },
  { img: istanaMini, caption: 'Istana Mini' },
  { img: lavaFlow,   caption: 'Lava Flow' },
  { img: parigi,     caption: 'Monumen Parigi Rante' },
  { img: perkebun,   caption: 'Perkebunan Pala' },
  { img: pulauRun,   caption: 'Pulau Run' },
]

export default function Gallery() {
  return (
    <section id="galeri" className="relative py-24 bg-rgba(0, 0, 0, 1) overflow-hidden">
      {/* Decorative circles */}
      <img src={circleSvg} alt="" aria-hidden className="absolute -bottom-20 -left-20 w-72 opacity-20 pointer-events-none" />
      <img src={circleSvg} alt="" aria-hidden className="absolute -top-16 -right-16 w-64 opacity-10 pointer-events-none" />

      <div className="relative z-[1] max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center justify-center border border-white/30 rounded-full px-6 py-2 text-light-blue font-bold tracking-widest uppercase text-xl">
            Galeri
          </span>
        </motion.div>

        {/* Swiper Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
          >
            {galeriItems.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="group cursor-pointer">
                  <div className="relative rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                    <img
                      src={item.img}
                      alt={item.caption}
                      className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                      <p
                        className="text-white font-bold text-lg leading-tight"
                        style={{ textShadow: '0 4px 4px rgba(0,0,0,0.5)' }}
                      >
                        {item.caption}
                      </p>
                    </div>
                  </div>
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
