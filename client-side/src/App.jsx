import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import InfoSections from './components/InfoSections'
import Gallery from './components/Gallery'
import Fakta from './components/Fakta'
import Location from './components/Location'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import OceanBackground from './components/OceanBackground' 
import { useIsMobileRaf } from './hooks/useViewportRaf'

const SIDEBAR_WIDTH = 240

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isMobile = useIsMobileRaf(768)

  const transitionConfig = useMemo(() => ({ type: 'spring', bounce: 0, duration: 0.4 }), [])
  const sidebarPadding = isSidebarOpen && !isMobile ? SIDEBAR_WIDTH : 0
  const layoutAnimate = useMemo(() => ({ paddingRight: sidebarPadding }), [sidebarPadding])

  return (
    <div className="relative min-h-screen w-full bg-[#07101E] text-white font-sans overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <OceanBackground />
      </div>

      <motion.div
        animate={layoutAnimate}
        transition={transitionConfig}
        className="fixed top-0 left-0 right-0 z-[40]"
        style={{ willChange: 'padding-right' }}
      >
        <Navbar />
      </motion.div>

      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      
      <motion.div 
        id="main-content"
        animate={layoutAnimate}
        transition={transitionConfig}
        className="relative z-10 w-full min-h-screen"
        style={{ willChange: 'padding-right' }}
      >
        <div className="w-full mx-auto 2xl:max-w-[1536px] flex flex-col">
          <main>
            <Hero />
            <InfoSections />
            <Gallery />
            <Fakta />
            <Location />
            <Contact />
          </main>
          <Footer />
        </div>
      </motion.div>

    </div>
  )
}