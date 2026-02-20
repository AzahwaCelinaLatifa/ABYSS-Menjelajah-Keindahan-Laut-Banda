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
  return (
    <div className="min-h-screen bg-primary text-white font-sans">
      <Navbar />
      <Sidebar />
      <main className="relative z-0">
        <Hero />
        <InfoSections />
        <Gallery />
        <Fakta />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
