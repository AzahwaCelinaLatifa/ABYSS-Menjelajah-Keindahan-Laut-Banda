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
    // [PERBAIKAN] Cabut 'fixed top-0 left-0' biar nurut sama wadah animate width di App.jsx
    <header className="w-full z-[100] overflow-visible">
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-[#001123]/80 backdrop-blur-md shadow-lg border-b border-white/5 py-2.5' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
          <div className="flex items-center justify-between">

            <a href="#beranda" className="flex items-center gap-2.5 shrink-0" onClick={() => handleClick('#beranda')}>
              <img src={logoSvg} alt="Abyss" className="w-7 h-7 object-contain" />
              <span className="text-xl font-bold tracking-tight text-white">Abyss</span>
            </a>

            <ul className="hidden lg:flex items-center gap-2">
              {navLinks.map(({ href, label }) => {
                const isActive = activeLink === href
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={() => handleClick(href)}
                      className={`relative px-4 py-1.5 rounded-full text-[15px] font-medium transition-all duration-300
                        ${isActive
                          ? 'text-white border border-white'
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
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
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
                className="absolute right-5 sm:right-8 top-full mt-3 w-48 z-[110] lg:hidden origin-top-right"
              >
                <div className="bg-[#0A192F]/95 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl">
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
                              ? 'text-white bg-white/15 shadow-sm'
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