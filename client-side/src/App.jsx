import { useState } from 'react'
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

  // [PERBAIKAN] Sesuaikan dengan w-64 di Sidebar (64 * 4px = 256px)
  const contentWidth = isSidebarOpen ? "calc(100% - 256px)" : "100%"

  const transitionConfig = { type: "spring", bounce: 0, duration: 0.4 }

  return (
    <div className="relative min-h-screen bg-[#07101E] text-white font-sans overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <OceanBackground />
      </div>

      <motion.div
        animate={{ width: contentWidth }}
        transition={transitionConfig}
        className="fixed top-0 left-0 z-[100]"
      >
        <Navbar />
      </motion.div>

      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      
      <motion.div 
        id="main-content"
        animate={{ width: contentWidth }}
        transition={transitionConfig}
        className="relative z-10"
      >
        <main>
          <Hero />
          <InfoSections />
          <Gallery />
          <Fakta />
          <Location />
          <Contact />
        </main>
        <Footer />
      </motion.div>

    </div>
  )
}