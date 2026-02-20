import { useState } from 'react'
import { Phone, Mail, MapPin, Send } from 'lucide-react'
import { motion } from 'framer-motion'

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
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="kontak" className="relative py-24 bg-gradient-to-b from-rgba(0, 17, 35, 1)   to-secondary overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* ===== TOP ROW: Judul Form + Form ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
        >
          {/* Judul form */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl font-medium text-white mb-4">Contact Form</h2>
            <p className="text-white text-base">Please fill out this form</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block text-lg text-white mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full bg-card border border-white focus:border-accent text-white placeholder-white rounded-full px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg text-white mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                className="w-full bg-card border border-white focus:border-accent text-white placeholder-white rounded-full px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg text-white mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here"
                required
                className="w-full bg-card border border-white focus:border-accent text-white placeholder-white rounded-4xl px-4 py-3 text-sm outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="self-start inline-flex items-center gap-2 bg-dark border border-white hover:bg-light-blue hover:text-white text-light-blue font-semibold px-8 py-3 rounded-full transition-colors duration-300"
            >
              SUBMIT
            </button>
            {sent && <p className="text-green-400 text-sm">Pesan berhasil dikirim!</p>}
          </form>
        </motion.div>

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
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-accent" />
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
    </section>
  )
}
