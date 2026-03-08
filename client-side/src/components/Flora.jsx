import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Pastikan path-nya sesuai dengan folder kamu
import ImageWithSkeleton from './ImageWithSkeleton' 

/* ============================================================
   Import semua gambar flora
   ============================================================ */
import terumbu from '../assets/flora/Terumbu Karang (Coral Reefs).webp'
import kima from '../assets/flora/Kima (Giant Clams).webp'
import lamun from '../assets/flora/Padang Lamun (Seagrass Beds).webp'
import alga from '../assets/flora/Alga Laut (Marine Algae).webp'
import valonia from '../assets/flora/Valonia Ventricosa.webp'
import ulva from '../assets/flora/Ulva Lactua.webp'
import acantho from '../assets/flora/Acanthophora Spicifera.webp'
import galaxaura from '../assets/flora/Galaxaura sp..webp'
import gracilaria from '../assets/flora/Gracilaria sp..webp'
import eucheuma from '../assets/flora/Eucheuma cottonii.webp'
import dictyota from '../assets/flora/Dictyota sp..webp'
import caulerpaR from '../assets/flora/Caulerpa racemosa.webp'
import caulerpaS from '../assets/flora/Caulerpa sertularioides.webp'
import cymodoceaR from '../assets/flora/Cymodocea rotundata.webp'
import cymodoceaS from '../assets/flora/Cymodocea serrulata.webp'
import enhalus from '../assets/flora/Enhalus acoroides.webp'
import halimeda from '../assets/flora/Halimeda sp..webp'
import halodule from '../assets/flora/Halodule uninervis.webp'
import halophila from '../assets/flora/Halophila ovalis.webp'
import padina from '../assets/flora/Padina sp..webp'
import sargassum from '../assets/flora/Sargassum sp. .webp'
import syringodium from '../assets/flora/Syringodium isoetifolium.webp'
import thalassia from '../assets/flora/Thalassia hemprichii .webp'
import turbinaria from '../assets/flora/Turbinaria sp..webp'

/* ============================================================
   Data Flora
   ============================================================ */
const floraData = [
  { img: terumbu, name: 'Terumbu Karang (Coral Reefs)', desc: 'Ekosistem laut yang dibentuk oleh karang keras dan penting sebagai habitat utama biota laut.', info:'Terumbu Karang Laut Banda adalah ekosistem bawah laut di Kepulauan Banda yang kaya akan ratusan spesies ikan dan didominasi oleh karang jenis Acropora. Selain menjadi habitat alami yang sangat beragam, area ini memiliki nilai ekonomi penting namun kini terancam oleh pencemaran dan aktivitas manusia.' },
  { img: kima, name: 'Kima (Giant Clams)', desc: 'Moluska besar yang menyumbang kalsium karbonat untuk pertumbuhan terumbu karang.', info:'Kima (giant clams) merupakan moluska laut berukuran besar dari famili Tridacnidae yang hidup menempel pada terumbu karang di perairan tropis, terutama di kawasan Indo-Pasifik. Selain dikenal sebagai salah satu moluska terbesar di dunia, kima memiliki peran ekologis penting karena cangkangnya tersusun dari kalsium karbonat yang turut menyumbang material bagi pembentukan dan pertumbuhan terumbu karang. Kima juga bersimbiosis dengan alga zooxanthellae di dalam jaringan tubuhnya, yang membantu proses fotosintesis sehingga meningkatkan produktivitas ekosistem karang dan menjaga keseimbangan lingkungan laut.' },
  { img: lamun, name: 'Padang Lamun (Seagrass Beds)', desc: 'Habitat laut yang menyediakan sumber makanan dan tempat perlindungan bagi berbagai ikan dan penyu.', info:'Padang Lamun adalah ekosistem tumbuhan laut dangkal yang berfungsi sebagai tempat mencari makan dan perlindungan bagi ikan, penyu, serta hewan laut lainnya. Ekosistem ini berperan penting sebagai "tempat asuhan" bagi ikan muda, penstabil dasar laut, penyerap karbon, serta penjaga kejernihan air.' },
  { img: alga, name: 'Alga Laut (Marine Algae)', desc: 'Produsen primer yang mendukung rantai makanan laut dan membantu stabilitas terumbu karang.', info:'Alga Laut adalah organisme fotosintetik yang berfungsi sebagai produsen utama dalam rantai makanan laut. Selain menghasilkan bahan organik dan oksigen bagi biota lain, alga juga membantu menjaga keseimbangan ekosistem dengan menyerap nutrisi berlebih dan mendukung stabilitas terumbu karang.' },
  { img: valonia, name: 'Valonia Ventricosa', desc: 'Organisme sel tunggal raksasa berbentuk bola hijau mengkilap yang menghuni sela-sela karang Banda.', info:'Alga Bola Mata (bubble alga) adalah flora unik berbentuk bulatan hijau tua mengkilap seperti kelereng. Meskipun terlihat seperti buah kecil, satu bulatan ini sebenarnya adalah satu sel raksasa, menjadikannya salah satu organisme bersel tunggal terbesar di dunia yang hidup di sela-sela karang.' },
  { img: ulva, name: 'Ulva Lactua', desc: 'Alga hijau berbentuk lembaran tipis bergelombang yang menjadi sumber makanan utama ikan herbivora.', info:'Sering disebut sebagai selada laut, alga hijau ini memiliki bentuk berupa lembaran tipis transparan yang sangat lebar dan bergelombang di bagian pinggirnya. Ulva biasanya tumbuh dengan sangat cepat di area yang memiliki kandungan nutrisi tinggi, dan lembarannya yang lembut menjadi sumber makanan bagi berbagai jenis ikan herbivora di sekitar kepulauan.' },
  { img: acantho, name: 'Acanthophora Spicifera', desc: 'Alga merah bertekstur duri tumpul yang tumbuh menempel pada substrat keras di area pasang surut.', info:'Alga merah ini memiliki ciri khas yang sangat mencolok berupa duri-duri kecil yang tumbuh di sepanjang cabang-cabangnya, memberikan tampilan yang "berduri" namun sebenarnya tumpul. Ia sangat adaptabel dan sering ditemukan tumbuh menempel pada substrat keras seperti batu atau cangkang kerang di area pasang surut yang sering terkena sinar matahari.' },
  { img: galaxaura, name: 'Galaxaura sp.', desc: 'Alga merah berkandungan kapur yang tumbuh membentuk koloni rimbun di dasar laut.', info:'Flora ini merupakan jenis alga merah yang memiliki kandungan kapur di dalam jaringannya, sehingga tubuhnya terasa agak kaku dan rapuh jika dipegang. Galaxaura biasanya tumbuh membentuk koloni rimbun menyerupai semak kecil di dasar laut dengan warna merah muda atau jingga yang menambah keberagaman warna di ekosistem laut Banda.' },
  { img: gracilaria, name: 'Gracilaria sp.', desc: 'Alga merah bercabang silindris yang menjadi bahan baku utama pembuatan agar-agar.', info:'Alga merah ini memiliki bentuk cabang yang panjang dan silindris mirip dengan kabel-kabel halus yang saling menjuntai, biasanya berwarna merah tua atau kecokelatan. Gracilaria tumbuh subur di perairan yang tenang dan merupakan bahan baku utama dalam pembuatan agar-agar yang sudah lama dipanen oleh penduduk pesisir secara tradisional.' },
  { img: eucheuma, name: 'Eucheuma cottonii', desc: 'Rumput laut kenyal berdaging tebal yang menjadi komoditas penting sebagai penghasil karagenan.', info:'Rumput laut ini memiliki tubuh yang berdaging tebal dan kenyal dengan banyak tonjolan-tonjolan tumpul di seluruh permukaannya. Eucheuma merupakan komoditas ekonomi yang sangat penting di wilayah Maluku karena mengandung karagenan yang digunakan sebagai bahan pengental dalam berbagai industri makanan dan kosmetik di seluruh dunia.' },
  { img: dictyota, name: 'Dictyota sp.', desc: 'Alga coklat lembaran tipis berkilau dengan tepi bergerigi yang menghiasi lereng terumbu karang.', info:'Dictyota adalah alga cokelat yang memiliki pola percabangan sangat teratur, di mana setiap cabangnya selalu terbagi menjadi dua bagian yang sama (dikotom). Ia biasanya tumbuh membentuk rumpun yang rimbun di area terumbu karang yang mati, memberikan tekstur dan warna cokelat keemasan yang kontras di bawah air yang jernih.' },
  { img: caulerpaR, name: 'Caulerpa racemosa', desc: 'Alga hijau berbentuk bola kecil bergerombol seperti anggur, hidup di dasar berpasir.', info:'Populer dengan nama anggur laut atau "latoh", alga hijau ini memiliki cabang yang dipenuhi bulatan-bulatan kecil menyerupai butiran buah anggur hijau yang segar. Selain menjadi pemandangan indah di dasar laut, jenis ini juga sering dimanfaatkan oleh masyarakat lokal sebagai bahan pangan alami yang kaya akan vitamin dan mineral.' },
  { img: caulerpaS, name: 'Caulerpa sertularioides', desc: 'Alga hijau menyerupai bulu unggas yang merayap cepat pada substrat pasir dan karang mati.', info:'Alga ini tumbuh merayap di dasar laut dengan cabang-cabang vertikal yang bentuknya menyerupai helai bulu burung atau daun pakis yang sangat halus. Warnanya yang hijau terang dan teksturnya yang lembut menjadikannya salah satu flora laut yang paling estetis, seringkali ditemukan menghiasi celah-celah di antara gundukan terumbu karang.' },
  { img: cymodoceaR, name: 'Cymodocea rotundata', desc: 'Lamun berdaun lebar dengan ujung membulat yang menjadi pakan favorit penyu hijau.', info:'Lamun ini mudah dikenali dari ujung daunnya yang berbentuk bulat sempurna dan halus tanpa gerigi, sering ditemukan tumbuh rapat di daerah dangkal yang terkena cahaya matahari penuh. Keberadaannya sangat penting bagi biota kecil seperti udang dan ikan muda karena kerapatan daunnya memberikan perlindungan yang sangat efektif dari kejaran predator.' },
  { img: cymodoceaS, name: 'Cymodocea serrulata', desc: 'Lamun dengan tepi daun bergerigi halus yang mendominasi padang lamun campuran.', info:'Berbeda dengan kerabatnya, jenis ini memiliki ciri khas pada ujung daun yang berbentuk datar dan memiliki gerigi-gerigi kecil (serrated) yang bisa dirasakan jika disentuh. Tumbuhan ini biasanya tumbuh di substrat yang lebih kasar atau berlumpur dan memiliki kemampuan adaptasi yang baik terhadap perubahan salinitas air laut di sekitar pesisir pulau.' },
  { img: enhalus, name: 'Enhalus acoroides', desc: 'Lamun terbesar Asia Tenggara dengan daun pita panjang yang menjadi habitat dugong.', info:'Lamun ini merupakan jenis yang paling besar dan kuat di perairan Banda Neira, dengan daun panjang yang bisa mencapai satu meter lebih menyerupai pita hijau tua yang kaku. Karena ukurannya yang besar, ia memiliki sistem akar yang sangat dalam dan kuat untuk mencengkeram dasar laut, sehingga berperan penting dalam menjaga kestabilan sedimen dan mencegah erosi pantai akibat arus laut yang kuat.' },
  { img: halimeda, name: 'Halimeda sp.', desc: 'Alga hijau berkapur berbentuk cakram berrantai yang berperan dalam pembentukan pasir koral.', info:'Alga hijau ini tersusun dari segmen-segmen pipih berbentuk jantung atau ginjal yang mengandung zat kapur sangat tinggi sehingga teksturnya cukup keras. Halimeda memiliki peran geologis yang besar karena ketika alga ini mati, bagian tubuhnya yang berkapur akan hancur dan berubah menjadi butiran pasir putih yang membentuk pantai-pantai indah di Kepulauan Banda.' },
  { img: halodule, name: 'Halodule uninervis', desc: 'Lamun pioneir berdaun sempit yang cepat tumbuh di area terganggu sebagai spesies pioner.', info:'Lamun pionir ini memiliki daun yang sangat sempit dan tipis, dengan ciri khas ujung daun yang memiliki tiga gigi kecil (trisula) yang hanya terlihat jelas di bawah lup. Ia sering menjadi tumbuhan pertama yang mengkolonisasi area dasar laut yang baru terbuka atau terganggu, membantu mempersiapkan kondisi lingkungan agar jenis lamun lain yang lebih besar bisa tumbuh kemudian.' },
  { img: halophila, name: 'Halophila ovalis', desc: 'Lamun kecil berbentuk oval yang hidup di kedalaman besar dengan cahaya rendah.', info:'Flora ini memiliki bentuk yang sangat unik karena daunnya yang kecil berbentuk oval menyerupai sendok atau telur, tumbuh berpasangan pada batang yang merayap di bawah pasir. Meskipun terlihat rapuh, Halophila ovalis sangat tangguh dan mampu tumbuh di berbagai kedalaman, menjadikannya salah satu penyedia oksigen penting di area dasar laut yang berpasir halus.' },
  { img: padina, name: 'Padina sp.', desc: 'Alga coklat berbentuk kipas berlapis kalsium putih yang indah di terumbu karang dangkal.', info:'Dikenal dengan sebutan alga kipas, Padina memiliki lembaran tubuh yang melebar membentuk kipas dengan garis-garis konsentris yang cantik di permukaannya. Bagian tubuhnya seringkali terlihat berwarna keputihan karena adanya lapisan kalsium karbonat, yang membuatnya unik di antara jenis alga cokelat lainnya di perairan dangkal Banda.' },
  { img: sargassum, name: 'Sargassum sp.', desc: 'Alga coklat bercabang banyak dengan gelembung udara yang menjadi habitat ribuan organisme kecil.', info:'Alga cokelat ini sangat ikonik karena memiliki struktur mirip batang dan daun tumbuhan darat, serta dilengkapi dengan "bladder" atau kantong udara bulat kecil berisi gas. Kantong udara ini berfungsi sebagai pelampung agar tubuh alga tetap tegak menuju permukaan laut untuk menyerap cahaya matahari maksimal guna proses fotosintesis.' },
  { img: syringodium, name: 'Syringodium isoetifolium', desc: 'Lamun berdaun bulat panjang menyerupai tabung yang tumbuh di perairan jernih dangkal.', info:'Jenis lamun ini sangat unik karena daunnya tidak berbentuk pita datar, melainkan silindris bulat menyerupai lidi atau mie yang lentur. Bentuk daun yang aerodinamis ini memungkinkan Syringodium untuk bertahan di area dengan arus laut yang cukup kencang tanpa risiko daunnya sobek, sekaligus memberikan tekstur habitat yang berbeda bagi mikroorganisme laut.' },
  { img: thalassia, name: 'Thalassia hemprichii', desc: 'Lamun kuat berdaun seperti pita yang mendominasi padang lamun tropis Asia.', info:'Sering disebut sebagai "lamun dugong", tumbuhan ini memiliki rimpang yang sangat tebal dan daun yang melengkung pendek, biasanya tumbuh membentuk hamparan luas di rataan terumbu. Padang lamun ini adalah ekosistem yang sangat produktif karena menjadi tempat mencari makan utama bagi penyu hijau dan mamalia laut dugong yang sering melintasi perairan Maluku.' },
  { img: turbinaria, name: 'Turbinaria sp.', desc: 'Alga coklat berbentuk corong berlapis yang membentuk koloni padat di terumbu terbuka.', info:'Flora laut ini memiliki tekstur yang sangat keras dan kaku, dengan bentuk daun yang menyerupai corong atau payung terbalik yang tepinya bergerigi tajam. Turbinaria biasanya melekat sangat kuat pada bebatuan karang di area yang terkena hempasan ombak kuat, karena struktur tubuhnya yang kokoh mampu menahan tekanan mekanis dari energi laut.' },
]

/* ============================================================
   Modal Component
   ============================================================ */
function FloraModal({ selectedIndex, setSelectedIndex, onClose }) {
  if (selectedIndex === null) return null;

  const item = floraData[selectedIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? floraData.length - 1 : prev - 1));
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === floraData.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-[#0B1420] border border-[#7CA1D3]/40 rounded-[1.5rem] max-w-3xl w-[92%] sm:w-full flex flex-col shadow-2xl h-[65vh] sm:h-[70vh] max-h-[600px] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[60] bg-[#7CA1D3]/10 border border-[#7CA1D3]/50 text-[#7CA1D3] hover:bg-[#7CA1D3]/30 rounded-full p-2 transition-all shadow-md"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          <div className="flex-none pt-12 sm:pt-8 px-4 sm:px-12 pb-4 flex flex-col items-center relative z-10 bg-[#0B1420]">
            <h3 className="text-lg sm:text-2xl font-bold text-white mb-4 text-center px-4 sm:px-8 leading-tight w-full">
              {item.name}
            </h3>

            <div className="relative w-full sm:w-[85%] lg:w-[75%] flex justify-center items-center">
              <button
                onClick={handlePrev}
                className="absolute left-0 sm:-left-12 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#7CA1D3] bg-[#0B1420]/90 hover:bg-[#7CA1D3]/20 flex items-center justify-center text-[#7CA1D3] shadow-lg transition-colors"
              >
                <ChevronLeft size={22} />
              </button>

              <ImageWithSkeleton 
                src={item.img} 
                alt={item.name} 
                wrapperClassName="w-40 h-40 sm:w-auto sm:h-48 aspect-square sm:aspect-video rounded-xl shadow-lg border border-white/10"
                imgClassName="w-full h-full object-cover" 
              />

              <button
                onClick={handleNext}
                className="absolute right-0 sm:-right-12 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#7CA1D3] bg-[#0B1420]/90 hover:bg-[#7CA1D3]/20 flex items-center justify-center text-[#7CA1D3] shadow-lg transition-colors"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          <div 
            className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-12 pt-2 pb-10 relative"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(124, 161, 211, 0.5) transparent' }}
          >
            <p className="text-white/80 leading-relaxed text-sm sm:text-base text-left sm:text-justify w-full">
              {item.info}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#0B1420] to-transparent pointer-events-none z-10"></div>
        </motion.div>

        <div className="mt-5 z-10" onClick={e => e.stopPropagation()}>
          <div className="flex items-center gap-2 px-6 py-2 border border-[#7CA1D3]/50 rounded-[2rem] bg-[#0B1420]/80 backdrop-blur-sm text-sm sm:text-base font-bold shadow-md">
            <span className="text-white">{selectedIndex + 1}</span>
            <span className="text-[#7CA1D3] font-medium">/</span>
            <span className="text-white/70">{floraData.length}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ============================================================
   Card animation variants
   ============================================================ */
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
}

/* ============================================================
   Main Flora Section
   ============================================================ */
export default function Flora() {
  const [page, setPage] = useState(0)
  const [modalIndex, setModalIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const itemsPerPage = isMobile ? 1 : 4
  const totalPages = Math.ceil(floraData.length / itemsPerPage)
  
  // Solusi aman agar layar tidak blank saat di-resize dan ESLint tidak ngomel
  useEffect(() => {
    if (page >= totalPages && totalPages > 0) {
      setTimeout(() => {
        setPage(0);
      }, 0);
    }
  }, [totalPages, page]);

  const visibleItems = floraData.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)

  const prevPage = () => setPage(p => (p === 0 ? totalPages - 1 : p - 1))
  const nextPage = () => setPage(p => (p === totalPages - 1 ? 0 : p + 1))

  useEffect(() => {
    const timer = setInterval(() => {
      if (modalIndex === null && !isHovered) {
        setPage(p => (p === totalPages - 1 ? 0 : p + 1))
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [totalPages, modalIndex, isHovered])

  const headerLine1 = "Macam flora laut Banda yang menjaga".split(" ")
  const headerLine2 = "keseimbangan ekosistemnya".split(" ")

  return (
    <section id="flora" className="relative min-h-screen py-6 flex flex-col justify-center bg-transparent overflow-hidden">
      <div className="relative z-[1] max-w-5xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-block border border-[#7CA1D3]/50 rounded-full px-8 py-2 text-[#7CA1D3] font-bold tracking-widest uppercase text-sm md:text-base bg-[#7CA1D3]/5">
            Flora
          </span>
          
          <motion.h2 
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
          >
            {headerLine1.map((word, i) => (
              <motion.span 
                key={`fl1-${i}`} 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 150 } }
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
            <br className="hidden sm:block" />
            {headerLine2.map((word, i) => (
              <motion.span 
                key={`fl2-${i}`} 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 150 } }
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        <div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-5 justify-items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {visibleItems.map((item, i) => {
            const realIndex = (page * itemsPerPage) + i;

            return (
              <motion.div
                key={`${page}-${i}`}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full max-w-[280px] lg:max-w-none"
              >
                <div
                  className="relative rounded-[1.2rem] overflow-hidden cursor-pointer group transition-transform duration-500 hover:scale-[1.03] shadow-lg border border-white/5 bg-[#0B1420]"
                  onClick={() => setModalIndex(realIndex)}
                >
                  <ImageWithSkeleton
                    src={item.img}
                    alt={item.name}
                    wrapperClassName="w-full h-[240px] lg:h-[200px]"
                    imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B1420] via-[#0B1420]/70 to-transparent p-4 lg:p-3 z-20">
                    <h5 className="text-white font-semibold text-base lg:text-sm leading-tight lg:truncate">{item.name}</h5>
                  </div>
                </div>
                <p className="mt-3 text-white/70 text-sm lg:text-[11px] leading-relaxed px-1 line-clamp-2">
                  {item.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-4 mt-8 lg:mt-10">
          <button onClick={prevPage} className="w-10 h-10 rounded-full border border-[#7CA1D3]/50 bg-transparent hover:bg-[#7CA1D3]/10 transition-colors flex items-center justify-center text-[#7CA1D3] shrink-0">
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center px-3 py-1.5 border border-[#7CA1D3]/50 rounded-[2rem] bg-[#0B1420]/50 backdrop-blur-sm">
            {isMobile ? (
              <div className="px-4 py-1.5 bg-[#7CA1D3] text-white rounded-full text-sm font-bold shadow-md flex items-center gap-2">
                <span>{page + 1}</span>
                <span className="text-white/60 font-medium">/</span>
                <span className="text-white/90">{totalPages}</span>
              </div>
            ) : (
              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      i === page ? 'bg-[#7CA1D3] text-white shadow-md' : 'text-[#7CA1D3] hover:bg-[#7CA1D3]/10'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={nextPage} className="w-10 h-10 rounded-full border border-[#7CA1D3]/50 bg-transparent hover:bg-[#7CA1D3]/10 transition-colors flex items-center justify-center text-[#7CA1D3] shrink-0">
            <ChevronRight size={20} />
          </button>
        </div>

      </div>

      <FloraModal 
        selectedIndex={modalIndex} 
        setSelectedIndex={setModalIndex} 
        onClose={() => setModalIndex(null)} 
      />
    </section>
  )
}