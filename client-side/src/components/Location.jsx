import { motion } from 'framer-motion'

export default function Location() {
  // Link Map baru dengan koordinat presisi Banda Neira (Pemukiman)
  // t=k (satelit), z=15 (zoom-in pas agar terlihat pemukiman & tidak kosong)
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15915.244033284768!2d129.9042578!3d-4.5208643!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d6f7f6a738c82a5%3A0xc3f0b069695d8526!2sBanda%20Neira!5e1!3m2!1sid!2sid!4v1708520000000!5m2!1sid!2sid&maptype=satellite";

  return (
    <section
      id="lokasi"
      className="relative py-24 bg-gradient-to-b from-[#000204] to-[#001123]/50 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center justify-center border border-white/30 rounded-full px-6 py-2 text-light-blue font-bold tracking-widest uppercase text-xl">
            Lokasi
          </span>         
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-snug text-white">
            Laut Banda terletak di provinsi Maluku, Indonesia
          </h2>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-3xl overflow-hidden border border-white/10 shadow-lg"
        >
          <iframe
            title="Banda Sea map"
            src={mapSrc}
            className="w-full h-[340px] sm:h-[440px] border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* CTA - Link MORE Tetap Menggunakan Link Awal Anda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 text-center"
        >
          <a
            href="https://www.google.com/maps?ll=-4.517902,129.90406&z=14&t=h&hl=id&gl=ID&mapclient=embed&q=Banda+Neira+Kp.+Baru+Kec.+Banda+Kabupaten+Maluku+Tengah,+Maluku"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center gap-2 bg-dark border border-white hover:bg-light-blue hover:text-white text-light-blue font-semibold px-8 py-3 rounded-full transition-colors duration-300"
          >
            MORE
          </a>
        </motion.div>
      </div>
    </section>
  )
}