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
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#beranda')

  /* ---- scroll shadow ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ---- intersection observer ---- */
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

  // Auto-close menu
  const handleClick = useCallback((href) => {
    setActiveLink(href)
    setMobileOpen(false) 
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] navbar-glass transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_2px_24px_rgba(0,0,0,0.55)]' : ''
      }`}
    >
      {/* Container pakai max-w-7xl biar rapi */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-2.5 shrink-0" onClick={() => handleClick('#beranda')}>
            <img src={logoSvg} alt="Abyss" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold tracking-tight text-white">Abyss</span>
          </a>

          {/* Desktop & Tablet links -> Diubah dari lg:flex ke md:flex */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const isActive = activeLink === href
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => handleClick(href)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${isActive
                        ? 'text-white border-2 border-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Mobile hamburger -> Diubah dari lg:hidden ke md:hidden */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors z-[120]"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown -> Diubah dari lg:hidden ke md:hidden */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-4 top-[4.5rem] w-40 z-[110] md:hidden"
            >
              <div className="bg-[#0A192F]/95 backdrop-blur-lg border border-white/20 p-2 rounded-2xl shadow-2xl">
                <div className="flex flex-col gap-1.5">
                  {navLinks.map(({ href, label }) => {
                    const isActive = activeLink === href
                    return (
                      <a
                        key={href}
                        href={href}
                        onClick={() => handleClick(href)}
                        className={`block px-3 py-2 text-center rounded-full text-sm font-medium transition-all duration-300
                          ${isActive
                            ? 'text-white border-2 border-white bg-white/5'
                            : 'text-white/70 hover:text-white hover:bg-white/10 border-2 border-transparent'
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
  )
}