import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobileRaf } from '../hooks/useViewportRaf' 

const contactInfo = [
  { icon: Phone,   label: 'Phone',    value: '+62 345 2140' },
  { icon: Mail,    label: 'Email',    value: 'lautbanda7@gmail.com' },
  { icon: MapPin,  label: 'Address',  value: 'Kepulauan Banda, Maluku Tengah, Indonesia' },
]

const formHeaderInitial = { opacity: 0, x: -50 }
const formHeaderAnimate = { opacity: 1, x: 0 }
const formHeaderViewport = { once: true, amount: 0.2 }
const formHeaderTransition = { duration: 0.6 }

const formInitial = { opacity: 0, y: 20 }
const formAnimate = { opacity: 1, y: 0 }
const formViewport = { once: true, amount: 0.3 }
const formTransition = { type: 'tween', duration: 0.6, delay: 0.1 }

const contactInfoInitial = { opacity: 0, y: 20 }
const contactInfoAnimate = { opacity: 1, y: 0 }
const contactInfoViewport = { once: true, amount: 0.3 }
const contactInfoTransition = { duration: 0.6, delay: 0.1 }

const toastInitial = { opacity: 0, y: 50, scale: 0.95 }
const toastAnimate = { opacity: 1, y: 0, scale: 1 }
const toastExit = { opacity: 0, y: 20, scale: 0.95 }

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const timeoutRef = useRef(null)
  
  const isMobile = useIsMobileRaf(768)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    timeoutRef.current = setTimeout(() => setSent(false), 5000)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <section 
      id="kontak" 
      className="relative py-16 md:py-24 flex flex-col justify-center bg-gradient-to-b from-[#001123] to-[#04070B] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full">

        {/* Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-center">
          
          <motion.div 
            initial={isMobile ? formHeaderAnimate : formHeaderInitial}
            whileInView={isMobile ? undefined : formHeaderAnimate}
            viewport={isMobile ? undefined : formHeaderViewport}
            transition={isMobile ? undefined : formHeaderTransition}
            className="flex flex-col justify-center"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-1">Contact Form</h2>
            <p className="text-white/70 text-xs">Please fill out this form</p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-2"
            initial={isMobile ? formAnimate : formInitial}
            whileInView={isMobile ? undefined : formAnimate}
            viewport={isMobile ? undefined : formViewport}
            transition={isMobile ? undefined : formTransition}
          >
            <div>
              <label htmlFor="name" className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full bg-transparent border border-white/40 focus:border-white text-white placeholder-white/20 rounded-full px-4 py-2 text-xs outline-none transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full bg-transparent border border-white/40 focus:border-white text-white placeholder-white/20 rounded-full px-4 py-2 text-xs outline-none transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={2} 
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message"
                required
                className="w-full bg-transparent border border-white/40 focus:border-white text-white placeholder-white/20 rounded-xl px-4 py-2 text-xs outline-none transition-all resize-none"
              />
            </div>
            
            <button
              type="submit"
              className="self-start inline-flex items-center gap-2 bg-transparent border border-white text-[#7CA1D3] font-semibold px-8 py-2.5 rounded-full transition-all duration-300 text-sm active:scale-95 active:bg-[#7CA1D3] active:text-white active:border-[#7CA1D3] md:hover:bg-[#7CA1D3] md:hover:text-white md:hover:border-[#7CA1D3] md:hover:scale-105 shadow-lg md:hover:shadow-[#7CA1D3]/40"
            >
              SUBMIT
            </button>
          </motion.form>
        </div>

        {/* Divider Ramping */}
        <div className="w-full h-[1px] bg-white/10 mb-6" />

        {/* ContactInfo */}
        <motion.div
          initial={isMobile ? contactInfoAnimate : contactInfoInitial}
          whileInView={isMobile ? undefined : contactInfoAnimate}
          viewport={isMobile ? undefined : contactInfoViewport}
          transition={isMobile ? undefined : contactInfoTransition}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
        >
          <div className="flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-1 leading-tight">Contact<br />Information</h2>
            <p className="text-white/70 text-xs">Please feel free to contact us</p>
          </div>

          <div className="flex flex-col gap-3 justify-center">
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                    <Icon size={12} className="text-white" />
                  </div>
                  <div>
                    <h6 className="text-white font-semibold text-[10px] uppercase tracking-tight">{item.label}</h6>
                    <p className="text-white/50 text-[11px]">{item.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

      </div>

      {/* TOAST notification */}
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={toastInitial}
            animate={toastAnimate}
            exit={toastExit}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100] w-auto min-w-[260px] bg-[#001123]/95 backdrop-blur-xl border border-[#7CA1D3]/40 rounded-2xl shadow-[0_8px_30px_rgba(124,161,211,0.2)] p-4 flex items-start justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <CheckCircle size={18} className="text-[#7CA1D3]" />
                <span className="text-white text-sm font-semibold tracking-wide">Message Sent!</span>
              </div>
              <p className="text-white/70 text-xs ml-[28px]">Your message has been delivered.</p>
            </div>
            <button 
              onClick={() => setSent(false)}
              className="text-white/40 hover:text-[#7CA1D3] transition-colors mt-0.5"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default memo(Contact)