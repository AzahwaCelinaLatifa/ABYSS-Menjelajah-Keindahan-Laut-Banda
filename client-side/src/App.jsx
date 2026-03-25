import { useState, useEffect } from 'react'
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

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const transitionConfig = { type: "spring", bounce: 0, duration: 0.4 }
  
  // PERBAIKAN: Lebar menyesuaikan w-60 yang baru di Sidebar.jsx
  const SIDEBAR_WIDTH = 240; 

  return (
    <div className="relative min-h-screen w-full bg-[#07101E] text-white font-sans overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <OceanBackground />
      </div>

      <motion.div
        animate={{ paddingRight: isSidebarOpen && !isMobile ? SIDEBAR_WIDTH : 0 }}
        transition={transitionConfig}
        className="fixed top-0 left-0 right-0 z-[999]"
      >
        <Navbar />
      </motion.div>

      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      
      <motion.div 
        id="main-content"
        animate={{ paddingRight: isSidebarOpen && !isMobile ? SIDEBAR_WIDTH : 0 }}
        transition={transitionConfig}
        className="relative z-10 w-full min-h-screen"
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