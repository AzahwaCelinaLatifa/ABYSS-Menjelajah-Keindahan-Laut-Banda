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
// IMPORT BACKGROUND LAUTNYA DI SINI
import OceanBackground from './components/OceanBackground' 

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-primary text-white font-sans overflow-x-hidden">
      
      {/* --- BACKGROUND LAUT BANDA GLOBAL --- */}
      <OceanBackground />

      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      
      <motion.div 
        animate={{ 
          paddingRight: isSidebarOpen ? '320px' : '0px' 
        }}
        transition={{ 
          type: "spring", 
          bounce: 0, 
          duration: 0.4 
        }}
        // Tambahkan relative z-10 di sini supaya konten ada di atas gelembung
        className="w-full relative z-10"
      >
        <Navbar />
        <main className="relative z-10">
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