import { memo } from 'react'
import { motion } from 'framer-motion'

const mapSrc =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15915.244033284768!2d129.9042578!3d-4.5208643!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d6f7f6a738c82a5%3A0xc3f0b069695d8526!2sBanda%20Neira!5e1!3m2!1sid!2sid!4v1708520000000!5m2!1sid!2sid&maptype=satellite'

function Location() {
  return (
    <section
      id="lokasi"
      className="relative py-16 md:py-24 flex flex-col justify-center bg-gradient-to-b from-[#000204] to-[#001123] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 w-full flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-4">
          <span className="inline-block border border-[#7CA1D3]/50 rounded-full px-8 py-2 text-[#7CA1D3] font-bold tracking-widest uppercase text-sm md:text-base bg-[#7CA1D3]/5">
            Lokasi
          </span>        
          
          <h2 className="mt-2 text-xl md:text-2xl lg:text-3xl font-bold leading-snug text-white max-w-3xl">
            Laut Banda terletak di provinsi Maluku, Indonesia
          </h2>
        </div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 shadow-lg"
        >
          <iframe
            title="Banda Sea map"
            src={mapSrc}
            className="w-full h-[40vh] min-h-[300px] max-h-[400px] border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 text-center"
        >
          <a
            href="https://www.google.com/maps?ll=-4.517902,129.90406&z=14&t=h&hl=id&gl=ID&mapclient=embed&q=Banda+Neira+Kp.+Baru+Kec.+Banda+Kabupaten+Maluku+Tengah,+Maluku"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center gap-2 bg-transparent border border-white text-[#7CA1D3] font-semibold px-8 py-2.5 rounded-full transition-all duration-300 text-sm hover:bg-[#7CA1D3] hover:text-white hover:border-[#7CA1D3] hover:scale-105 active:scale-95 shadow-lg hover:shadow-[#7CA1D3]/40"
          >
            MORE
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(Location)