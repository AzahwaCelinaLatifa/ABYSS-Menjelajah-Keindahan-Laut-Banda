import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logoSvg from '../assets/logo.svg'

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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-2.5 shrink-0" onClick={() => handleClick('#beranda')}>
            <img src={logoSvg} alt="Abyss" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold tracking-tight text-white">Abyss</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
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
                        : 'text-white text-lg font-semibold hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-primary/95 backdrop-blur-lg"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => handleClick(href)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                      ${activeLink === href
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
