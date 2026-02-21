import { useState } from 'react'
import { motion } from 'framer-motion' // Import motion

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import InfoSections from './components/InfoSections'
import Gallery from './components/Gallery'
import Fakta from './components/Fakta'
import Location from './components/Location'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-primary text-white font-sans overflow-x-hidden">
      
      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      
      {/* INI KUNCINYA: Gunakan <motion.div> bukan <div> biasa */}
      <motion.div 
        animate={{ 
          paddingRight: isSidebarOpen ? '320px' : '0px' 
        }}
        transition={{ 
          type: "spring", 
          bounce: 0, 
          duration: 0.4 
        }}
        className="w-full"
      >
        <Navbar />
        <main className="relative z-0">
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