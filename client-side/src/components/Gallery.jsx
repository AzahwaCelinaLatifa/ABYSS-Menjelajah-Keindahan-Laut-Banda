import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion' 

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


// Import gambar galeri (TIDAK BERUBAH)
import menyelam from '../assets/galeri/Menyelam (Scuba Diving).svg'
import gunungApi from '../assets/galeri/Gunung Api Banda.svg'
import lumbaLumba from '../assets/galeri/Tur Lumba-Lumba.svg'
import benteng from '../assets/galeri/Benteng Belgica.svg'
import bungHatta from '../assets/galeri/Rumah Pengasingan Bung Hatta.svg'
import pulauHatta from '../assets/galeri/Pulau Hatta.svg'
import gerejaT from '../assets/galeri/Gereja Tua Banda Neira.svg'
import istanaMini from '../assets/galeri/Istana Mini.svg'
import lavaFlow from '../assets/galeri/Lava Flow.svg'
import parigi from '../assets/galeri/Monumen Parigi Rante.svg'
import perkebun from '../assets/galeri/Perkebunan Pala.svg'
import pulauRun from '../assets/galeri/Pulau Run.svg'

const galeriItems = [
  { img: menyelam, title: 'Menyelam (Scuba Diving)', desc: 'Menjelajahi keindahan bawah laut Banda yang jernih dengan jarak pandang yang luar biasa. Kamu bisa menemukan terumbu karang purba dan ribuan spesies ikan tropis di situs penyelaman kelas dunia ini.' },
  { img: gunungApi, title: 'Gunung Api Banda', desc: 'Gunung api aktif yang menjulang tinggi di tengah laut dan menjadi ikon kebanggaan Maluku. Pendakian ke puncaknya menawarkan panorama seluruh kepulauan Banda Neira yang sangat memukau.' },
  { img: lumbaLumba, title: 'Tur Lumba-Lumba', desc: 'Melihat kawanan lumba-lumba yang menari bebas di perairan terbuka Laut Banda saat matahari terbit. Pengalaman magis ini menjadi salah satu daya tarik utama bagi para wisatawan lokal maupun mancanegara.' },
  { img: benteng, title: 'Benteng Belgica', desc: 'Benteng megah abad ke-17 peninggalan VOC yang dijuluki sebagai "The Monster of the East". Struktur berbentuk pentagon ini berdiri kokoh sebagai saksi sejarah perebutan rempah di masa kolonial.' },
  { img: bungHatta, title: 'Rumah Pengasingan Bung Hatta', desc: 'Tempat Mohammad Hatta menghabiskan masa pembuangan politiknya selama bertahun-tahun di Banda. Di rumah bersejarah ini, sang Proklamator tetap aktif menulis dan memberikan pendidikan bagi anak-anak lokal.' },
  { img: pulauHatta, title: 'Pulau Hatta', desc: 'Surga bagi pecinta ketenangan yang menawarkan pantai pasir putih dan taman bawah laut yang masih sangat alami. Terumbu karangnya yang sehat berada tepat di bibir pantai, menjadikannya lokasi snorkeling terbaik.' },
  { img: gerejaT, title: 'Gereja Tua Banda Neira', desc: 'Gereja kolonial yang dibangun sejak zaman Belanda dengan material bangunan yang didatangkan langsung dari Eropa. Arsitektur klasiknya masih terjaga sangat baik dan hingga kini masih digunakan untuk ibadah.' },
  { img: istanaMini, title: 'Istana Mini', desc: 'Kediaman resmi Gubernur VOC pada masanya yang memiliki arsitektur Neoklasik Eropa yang sangat elegan. Bangunan ini merupakan satu-satunya istana bergaya kolonial yang tersisa di wilayah kepulauan Banda.' },
  { img: lavaFlow, title: 'Lava Flow', desc: 'Area terumbu karang unik yang tumbuh subur di atas aliran lava pasca letusan Gunung Api tahun 1988. Kecepatan pertumbuhan karang di lokasi ini menjadi subjek penelitian para ahli kelautan dunia.' },
  { img: parigi, title: 'Monumen Parigi Rante', desc: 'Situs sejarah memilukan yang dibangun untuk mengenang pembantaian 44 tokoh adat Banda oleh pihak VOC pada tahun 1621. Monumen ini menjadi simbol ketabahan dan perjuangan masyarakat Maluku.' },
  { img: perkebun, title: 'Perkebunan Pala', desc: 'Asal mula buah pala terbaik dunia yang pernah menjadi komoditas lebih berharga daripada emas di pasar Eropa. Kamu bisa berjalan di bawah naungan pohon kenari raksasa yang melindungi tanaman pala sejak ratusan tahun lalu.' },
  { img: pulauRun, title: 'Pulau Run', desc: 'Pulau kecil yang memiliki nilai sejarah luar biasa karena pernah ditukar dengan Manhattan, New York, dalam Perjanjian Breda 1667. Pertukaran ini dilakukan demi mendapatkan kendali penuh atas monopoli perdagangan pala.' },
]

export default function Gallery() {
  const [flippedIndex, setFlippedIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Cek ukuran layar
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // === LOGIKA AUTO CLOSE (BALIK KARTU) ===
  useEffect(() => {
    // 1. Tutup (balik kartu) kalau user klik di luar area Galeri
    const handleClickOutside = (e) => {
      const galeriSection = document.getElementById('galeri');
      if (galeriSection && !galeriSection.contains(e.target)) {
        setFlippedIndex(null);
      }
    };

    // 2. Tutup kalau user scroll menjauh dan area Galeri hilang dari layar
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setFlippedIndex(null);
          }
        });
      },
      { threshold: 0 }
    );

    const galeriEl = document.getElementById('galeri');
    if (galeriEl) observer.observe(galeriEl);
    
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('hashchange', () => setFlippedIndex(null));

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('hashchange', () => setFlippedIndex(null));
      if (galeriEl) observer.unobserve(galeriEl);
    };
  }, []);

  return (
    <section id="galeri" className="relative py-20 bg-gradient-to-b from-[#000]/70 to-[#010F1F]/50 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block border border-white/30 rounded-full px-8 py-2 text-[#7CA1D3] font-bold tracking-widest uppercase text-xl">
            Galeri
          </span>
        </div>

        <div className="relative group px-2 sm:px-12">
          <Swiper
            key={isMobile ? 'mobile' : 'desktop'}
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            onSlideChange={() => setFlippedIndex(null)}
            navigation={{ nextEl: '.next-g', prevEl: '.prev-g' }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            className="w-full"
          >
            {isMobile ? (
              galeriItems.map((item, idx) => (
                <SwiperSlide key={`mob-${idx}`} className="pb-12">
                  <div className="px-4"> 
                    <GalleryCard 
                      item={item} 
                      index={`mob-${idx}`} 
                      delayIndex={0} 
                      flippedIndex={flippedIndex} 
                      setFlippedIndex={setFlippedIndex} 
                      isMobile={true} 
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              [0, 1].map((pageIdx) => (
                <SwiperSlide key={`desk-${pageIdx}`} className="pb-12">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {galeriItems.slice(pageIdx * 6, (pageIdx + 1) * 6).map((item, i) => (
                      <GalleryCard 
                        key={i} 
                        item={item} 
                        index={`desk-${pageIdx}-${i}`} 
                        delayIndex={i}
                        flippedIndex={flippedIndex} 
                        setFlippedIndex={setFlippedIndex} 
                        isMobile={false} 
                      />
                    ))}
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          <button className="prev-g absolute left-0 sm:-left-4 top-[45%] -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/20 bg-black/50 text-white flex items-center justify-center hover:bg-[#7CA1D3] transition-all">
            <ChevronLeft size={24} />
          </button>
          <button className="next-g absolute right-0 sm:-right-4 top-[45%] -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/20 bg-black/50 text-white flex items-center justify-center hover:bg-[#7CA1D3] transition-all">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

    </section>
  )
}

function GalleryCard({ item, index, flippedIndex, setFlippedIndex, isMobile, delayIndex = 0 }) {
  const isFlipped = flippedIndex === index;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: delayIndex * 0.1 }}
      className={`relative w-full perspective-1000 cursor-pointer ${isMobile ? 'aspect-[4/5]' : 'h-64 lg:h-72'}`}
      onClick={() => setFlippedIndex(isFlipped ? null : index)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="flip-front border border-white/10 bg-zinc-900 shadow-2xl">
          <img 
            src={item.img} 
            className="w-full h-full object-cover" 
            alt={item.title}
            style={{ 
              imageRendering: 'high-quality',
              WebkitBackfaceVisibility: 'hidden'
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000]/70 via-[#010F1F]/10 to-[#010F1F]/50 flex items-end p-6">
            <p className="text-white font-bold text-lg leading-tight tracking-wide">{item.title}</p>
          </div>
        </div>
        <div className="flip-back bg-[#010F1F] border border-[#7CA1D3]/40 p-6 flex flex-col justify-center items-center text-center">
          <h4 className="text-[#7CA1D3] font-black mb-4 uppercase text-sm tracking-widest">{item.title}</h4>
          <p className="text-white/90 text-[12px] leading-relaxed font-medium">
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}