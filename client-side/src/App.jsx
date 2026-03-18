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

  // Sesuaikan dengan w-64 di Sidebar (64 * 4px = 256px)
  const contentWidth = isSidebarOpen ? "calc(100% - 256px)" : "100%"

  const transitionConfig = { type: "spring", bounce: 0, duration: 0.4 }

  return (
    // PERBAIKAN 1: Pastikan root div benar-benar mengunci width layaknya body
    <div className="relative min-h-screen w-full max-w-[100vw] bg-[#07101E] text-white font-sans overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <OceanBackground />
      </div>

      <motion.div
        animate={{ width: contentWidth }}
        transition={transitionConfig}
        // PERBAIKAN 2: Batasi max-width navbar agar tidak tembus ke kanan saat mode desktop
        className="fixed top-0 left-0 z-[100] max-w-[100vw]"
      >
        <Navbar />
      </motion.div>

      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      
      <motion.div 
        id="main-content"
        animate={{ width: contentWidth }}
        transition={transitionConfig}
        // PERBAIKAN 3: Beri w-full dan auto margin, serta batas maksimal di layar ultra-lebar
        className="relative z-10 w-full mx-auto 2xl:max-w-[1536px] overflow-x-hidden"
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