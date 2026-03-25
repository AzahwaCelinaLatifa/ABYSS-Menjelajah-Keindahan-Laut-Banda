import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// IMPORT SKELETON
import ImageWithSkeleton from './ImageWithSkeleton'

// Import gambar galeri
import menyelam from '../assets/galeri/Menyelam (Scuba Diving).webp'
import gunungApi from '../assets/galeri/Gunung Api Banda.webp'
import lumbaLumba from '../assets/galeri/Tur Lumba-Lumba.webp'
import benteng from '../assets/galeri/Benteng Belgica.webp'
import bungHatta from '../assets/galeri/Rumah Pengasingan Bung Hatta.webp'
import pulauHatta from '../assets/galeri/Pulau Hatta.webp'
import gerejaT from '../assets/galeri/Gereja Tua Banda Neira.webp'
import istanaMini from '../assets/galeri/Istana Mini.webp'
import lavaFlow from '../assets/galeri/Lava Flow.webp'
import parigi from '../assets/galeri/Monumen Parigi Rante.webp'
import perkebun from '../assets/galeri/Perkebunan Pala.webp'
import pulauRun from '../assets/galeri/Pulau Run.webp'

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

  useEffect(() => {
    // 768px adalah batas untuk "desktop/tablet" yang akan menangkap 980px dari browser HP
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      const galeriSection = document.getElementById('galeri');
      if (galeriSection && !galeriSection.contains(e.target)) {
        setFlippedIndex(null);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) setFlippedIndex(null);
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
    <section id="galeri" className="relative py-16 md:py-24 flex flex-col justify-center bg-transparent overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        <div className="text-center mb-6 md:mb-8">
          <span className="inline-block border border-[#7CA1D3]/50 rounded-full px-8 py-2 text-[#7CA1D3] font-bold tracking-widest uppercase text-sm md:text-base bg-[#7CA1D3]/5">
            Galeri
          </span>
        </div>

        <div className="relative group mx-auto max-w-[300px] sm:max-w-[400px] md:max-w-full px-0 md:px-8">
          <Swiper
            key={isMobile ? 'mobile' : 'desktop'}
            modules={[Navigation, Pagination]}
            spaceBetween={isMobile ? 16 : 24}
            slidesPerView={1}
            loop={true}
            onSlideChange={() => setFlippedIndex(null)}
            navigation={{ nextEl: '.next-g', prevEl: '.prev-g' }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="w-full pb-10" 
          >
            {isMobile ? (
              galeriItems.map((item, idx) => (
                <SwiperSlide key={`mob-${idx}`}>
                  <div className="w-full px-1">
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
                <SwiperSlide key={`desk-${pageIdx}`}>
                  {/* Diubah: lg:grid-cols-3 dan lg:gap-6 menjadi md:grid-cols-3 dan md:gap-6 */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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

          <button className="prev-g absolute -left-3 sm:-left-4 md:-left-2 top-[45%] -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-[#7CA1D3]/30 bg-black/60 text-[#7CA1D3] flex items-center justify-center hover:bg-[#7CA1D3]/20 transition-all">
            <ChevronLeft size={20} />
          </button>
          <button className="next-g absolute -right-3 sm:-right-4 md:-right-2 top-[45%] -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-[#7CA1D3]/30 bg-black/60 text-[#7CA1D3] flex items-center justify-center hover:bg-[#7CA1D3]/20 transition-all">
            <ChevronRight size={20} />
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: delayIndex * 0.1 }}
      // Diubah: lg:h-[200px] menjadi md:h-[200px]
      className={`relative w-full cursor-pointer [perspective:1000px] ${isMobile ? 'aspect-[4/5]' : 'h-44 md:h-[200px]'}`}
      onClick={(e) => {
        e.stopPropagation();
        setFlippedIndex(isFlipped ? null : index);
      }}
    >
      <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        
        {/* SISI DEPAN */}
        <div className="absolute inset-0 [backface-visibility:hidden] border border-white/10 shadow-lg rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden bg-[#0B1420]">
          <ImageWithSkeleton
            src={item.img}
            alt={item.title}
            wrapperClassName="w-full h-full"
            imgClassName="w-full h-full object-cover"
          />
          {/* Diubah: lg:p-5 menjadi md:p-5 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-4 md:p-5 z-10 pointer-events-none">
            {/* Diubah: lg:text-base menjadi md:text-base */}
            <p className="text-white font-bold text-sm md:text-base leading-tight tracking-wide">{item.title}</p>
          </div>
        </div>

        {/* SISI BELAKANG */}
        {/* Diubah: lg:p-5 menjadi md:p-5 */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0A1626] border border-[#7CA1D3]/60 p-4 md:p-5 flex flex-col justify-center items-center text-center rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden">
          {/* Diubah: lg:mb-3 dan lg:text-xs menjadi md:mb-3 dan md:text-xs */}
          <h4 className="text-[#7CA1D3] font-black mb-2 md:mb-3 uppercase text-[11px] md:text-xs tracking-widest">{item.title}</h4>
          {/* Diubah: lg:text-[11px] dan lg:line-clamp-none menjadi md:text-[11px] dan md:line-clamp-none */}
          <p className="text-white/80 text-[10px] md:text-[11px] leading-snug font-medium line-clamp-5 md:line-clamp-none">
            {item.desc}
          </p>
        </div>
        
      </div>
    </motion.div>
  )
}