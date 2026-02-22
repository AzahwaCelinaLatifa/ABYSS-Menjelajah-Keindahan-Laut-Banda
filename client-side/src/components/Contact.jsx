import { useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const contactInfo = [
  { icon: Phone,   label: 'Phone',    value: '+62 345 2140' },
  { icon: Mail,    label: 'Email',    value: 'lautbanda7@gmail.com' },
  { icon: MapPin,  label: 'Address',  value: 'Kepulauan Banda, Maluku Tengah, Indonesia' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    // Toast akan hilang otomatis dalam 5 detik
    setTimeout(() => setSent(false), 5000) 
  }

  // --- Varian animasi untuk item form (masuk dari kanan ke tengah) ---
  const formItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  return (
    <section id="kontak" className="relative py-24 bg-gradient-to-b from-[#001123]/50  to-[#04070B]/100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* ===== TOP ROW: Judul Form + Form ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          
          {/* Judul form (Animasi dari kiri ke tengah) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl sm:text-5xl font-medium text-white mb-4">Contact Form</h2>
            <p className="text-white text-base">Please fill out this form</p>
          </motion.div>

          {/* Form (Animasi dari kanan ke tengah & berurutan) */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 } // Jarak waktu muncul antar kotak
              }
            }}
          >
            <motion.div variants={formItemVariants}>
              <label htmlFor="name" className="block text-lg text-white mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full bg-transparent border border-white focus:border-accent text-white placeholder-white rounded-full px-4 py-3 text-sm outline-none transition-colors"
              />
            </motion.div>
            
            <motion.div variants={formItemVariants}>
              <label htmlFor="email" className="block text-lg text-white mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                className="w-full bg-transparent border border-white focus:border-accent text-white placeholder-white rounded-full px-4 py-3 text-sm outline-none transition-colors"
              />
            </motion.div>
            
            <motion.div variants={formItemVariants}>
              <label htmlFor="message" className="block text-lg text-white mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here"
                required
                className="w-full bg-transparent border border-white focus:border-accent text-white placeholder-white rounded-4xl px-4 py-3 text-sm outline-none transition-colors resize-none"
              />
            </motion.div>
            
            <motion.button
              variants={formItemVariants}
              type="submit"
              className="self-start inline-flex items-center gap-2 bg-dark border border-white hover:bg-light-blue hover:text-white text-light-blue font-semibold px-8 py-3 rounded-full transition-colors duration-300"
            >
              SUBMIT
            </motion.button>
          </motion.form>
        </div>

        {/* Divider */}
        <div className="mb-16" />

        {/* ===== BOTTOM ROW: Judul Info + Info ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl font-medium text-white mb-4">Contact<br />Information</h2>
            <p className="text-white text-base">Please feel free to contact us</p>
          </div>

          <div className="flex flex-col gap-6 justify-center">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-accent"/>
                </div>
                <div>
                  <h6 className="text-white font-semibold text-sm">{label}</h6>
                  <p className="text-white/60 text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ===== TOAST NOTIFICATION BIOLUMINESCENT OCEAN VIBE ===== */}
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            // Warnanya dinaikkan sedikit lebih cerah dari background gelap, ditambah bayangan glow biru/cyan
            className="fixed bottom-6 right-6 z-[100] w-80 bg-gradient-to-br from-[#061b36]/95 to-[#022c4d]/95 backdrop-blur-md border border-light-blue-400/40 rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.25)] overflow-hidden"
          >
            {/* Toast Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-blue-400/20 bg-blue-400/10">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-light-blue-400" />
                <strong className="text-light-blue-50 text-sm font-semibold tracking-wide">Success</strong>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-light-blue-100/50 text-xs font-medium">Just now</span>
                <button 
                  onClick={() => setSent(false)} 
                  className="text-light-blue-100/50 hover:text-light-blue-300 hover:bg-light-blue-400/10 p-1 rounded-md transition-all"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            {/* Toast Body */}
            <div className="px-4 py-4">
              <p className="text-light-blue-50/90 text-sm">Pesan berhasil dikirim! Kami akan segera merespons.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}