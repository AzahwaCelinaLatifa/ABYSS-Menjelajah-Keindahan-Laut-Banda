import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Location() {
  return (
    <section
      id="lokasi"
      className="relative py-24 bg-gradient-to-b from-[rgba(0,0,0,1)] to-[rgba(0,17,35,1)] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center justify-center border border-white/30 rounded-full px-6 py-2 text-light-blue font-bold tracking-widest uppercase text-xl">
            Lokasi
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-snug">
            Jelajahi Keindahan Laut Banda
          </h2>
          <p className="mt-3 text-light-blue/70 max-w-xl mx-auto text-sm sm:text-base">
            Temukan lokasi eksotis Laut Banda di peta — surga tersembunyi di
            jantung Kepulauan Maluku, Indonesia.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-3xl overflow-hidden border border-white/10 shadow-lg"
        >
          <iframe
            title="Banda Sea map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1018659.0805498402!2d129.1456783871498!3d-4.521110238498889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d5757e10e9f8b9d%3A0xd3c1e97ca5e1f6c6!2sBanda%20Sea!5e0!3m2!1sen!2sid!4v1749556997024!5m2!1sen!2sid"
            className="w-full h-[340px] sm:h-[440px] border-0"
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
          className="mt-8 text-center"
        >
          <a
            href="https://www.google.com/maps/place/Banda+Sea"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition hover:bg-accent/80 active:scale-95"
          >
            <ExternalLink size={16} />
            MORE
          </a>
        </motion.div>
      </div>
    </section>
  )
}
