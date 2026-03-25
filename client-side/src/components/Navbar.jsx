import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logoSvg from '../assets/logo.webp'

const navLinks = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#flora',   label: 'Flora'   },
  { href: '#fauna',   label: 'Fauna'   },
  { href: '#galeri',  label: 'Galeri'  },
  { href: '#fakta',   label: 'Fakta'   },
  { href: '#lokasi',  label: 'Lokasi'  },
  { href: '#kontak',  label: 'Kontak'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#beranda')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map(l => l.href.slice(1))
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveLink(`#${e.target.id}`)
            break
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleClick = useCallback((href) => {
    setActiveLink(href)
    setMobileOpen(false) 
  }, [])

  return (
    <header className="w-full overflow-visible">
      <nav
        className={`w-full transition-colors duration-300 ${
          scrolled 
            ? 'bg-[#0B1420]/80 backdrop-blur-md shadow-lg border-b border-[#7CA1D3]/20 py-2.5' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
          <div className="flex items-center justify-between">

            <a href="#beranda" className="flex items-center gap-2.5 shrink-0" onClick={() => handleClick('#beranda')}>
              <img src={logoSvg} alt="Abyss" className="w-7 h-7 object-contain" />
              <span className="text-xl font-bold tracking-tight text-white shrink-0">Abyss</span>
            </a>

            {/* PERBAIKAN: Jarak gap dikurangi di layar nanggung agar menu muat & tidak tumpah */}
            <ul className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map(({ href, label }) => {
                const isActive = activeLink === href
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={() => handleClick(href)}
                      /* PERBAIKAN: Tambahkan whitespace-nowrap agar teks menu tidak turun ke bawah.
                         Ubah ukuran font dan padding menyesuaikan layar. */
                      className={`relative whitespace-nowrap px-2.5 py-1.5 lg:px-4 rounded-full text-[13px] lg:text-[15px] font-medium transition-all duration-300
                        ${isActive
                          ? 'text-[#7CA1D3] border border-[#7CA1D3] bg-[#7CA1D3]/10'
                          : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent'
                        }`}
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>

            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-[#7CA1D3]/20 hover:text-[#7CA1D3] transition-colors shrink-0"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-5 sm:right-8 top-full mt-3 w-48 z-[110] md:hidden origin-top-right"
              >
                <div className="bg-[#0B1420]/95 backdrop-blur-xl border border-[#7CA1D3]/40 p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.6)]">
                  <div className="flex flex-col gap-0.5">
                    {navLinks.map(({ href, label }) => {
                      const isActive = activeLink === href
                      return (
                        <a
                          key={href}
                          href={href}
                          onClick={() => handleClick(href)}
                          className={`block px-4 py-2.5 text-left rounded-xl text-sm font-medium transition-all duration-300
                            ${isActive
                              ? 'text-[#7CA1D3] bg-[#7CA1D3]/15 shadow-sm'
                              : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                        >
                          {label}
                        </a>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  )
}