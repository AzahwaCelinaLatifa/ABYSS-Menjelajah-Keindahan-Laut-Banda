import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/* ============================================================
   Import semua gambar fauna
   ============================================================ */
import napoleon   from '../assets/fauna/Ikan Napoleon (Cheilinus undulatus).svg'
import kakap      from '../assets/fauna/Ikan Kakap (Lutjanidae family).svg'
import kerapu     from '../assets/fauna/Ikan Kerapu.svg'
import tuna       from '../assets/fauna/Ikan Tuna Sirip Kuning (Thunnus Albacares).svg'
import kurisi     from '../assets/fauna/IKAN KURISI(Threadfin Bream).svg'
import hiuMartil  from '../assets/fauna/Hiu Martil (Hammerhead Shark).svg'
import pausPilot  from '../assets/fauna/Paus pilot (Globicephala).svg'
import barracuda  from '../assets/fauna/Great Barracuda (Sphyraena barracuda).svg'
import blackfin   from '../assets/fauna/Blackfin Barracuda (Sphyraena qenie).svg'
import bandedKrait from '../assets/fauna/Banded Sea Krait (Laticaudacolubrina).svg'
import oliveSnake from '../assets/fauna/Olive Sea Snake.svg'
import ikanBadut  from '../assets/fauna/Ikan Badut atau Ikan Giru (Genus Amphiprion).svg'
import butterfly  from '../assets/fauna/Ikan Kepe-kepe (Butterflyfish).svg'
import mandarin   from '../assets/fauna/Ikan Mandarin (Synchiropus splendidus).svg'
import sersan     from '../assets/fauna/Ikan Sersan (Pomacentridae).svg'
import singa      from '../assets/fauna/Ikan Singa (Lionfish).svg'
import triggerfish from '../assets/fauna/Ikan Triggerfish Hitam.svg'
import penyuHijau from '../assets/fauna/Penyu Hijau (Chelonia mydas).svg'
import penyuSisik from '../assets/fauna/Penyu Sisik (Eretmochelys imbricata).svg'
import pygmy      from '../assets/fauna/Pygmy Seahorse.svg'

/* ============================================================
   Data Fauna
   ============================================================ */
const faunaData = [
  { img: napoleon,    name: 'Ikan Napoleon (Cheilinus undulatus)',        desc: 'Ikan besar berwarna hijau kebiruan yang hidup soliter di terumbu karang dangkal Laut Banda.', 
    info: 'Ikan Napoleon adalah ikan karang raksasa yang memiliki ciri khas punuk di dahi dan bibir tebal. Ikan ini hidup sendiri di karang dangkal dan membantu menjaga kesehatan ekosistem dengan memakan hama laut. Karena keindahan warna dan jumlahnya yang semakin sedikit, ikan ini sekarang menjadi spesies yang sangat dilindungi.' },
  { img: kakap,       name: 'Ikan Kakap (Lutjanidae family)',              desc: 'Predator aktif yang berburu pada malam hari dengan penglihatan dan kecepatan tinggi.', 
    info: 'Ikan Kakap adalah anggota keluarga Lutjanidae berwarna cerah yang menghuni kawasan terumbu karang. Sebagai predator, ikan ini berperan penting dalam menjaga keseimbangan jumlah populasi ikan lain di ekosistem laut. Selain memiliki nilai ekonomi yang tinggi bagi nelayan, keindahan dan keberagaman ukurannya juga menjadi daya tarik utama bagi para penyelam.' },
  { img: kerapu,      name: 'Ikan Kerapu',                                 desc: 'Predator karang oportunistik yang gemar bersembunyi dan menyerang mangsa dari celah karang.', 
    info: 'Ikan Kerapu adalah penghuni perairan tropis yang dikenal karena tubuhnya yang besar dan warna yang bervariasi. Sebagai predator puncak di terumbu karang, ikan ini memegang peran penting dalam menjaga keseimbangan ekosistem laut. Selain menjadi daya tarik bagi para penyelam, ikan kerapu juga memiliki nilai ekonomi yang sangat tinggi bagi masyarakat nelayan.'},
  { img: tuna,        name: 'Ikan Tuna Sirip Kuning (Thunnus Albacares)',  desc: 'Ikan migratori cepat yang sering bergerak dalam kawanan besar di laut terbuka.', 
    info: 'Ikan Tuna Sirip Kuning adalah ikan laut lepas bertubuh ramping yang hidup di perairan hangat tropis. Ikan ini memiliki ciri khas sirip berwarna kuning terang dan menjadi komoditas perikanan yang sangat penting bagi pasar dunia. Sebagai pemburu di laut terbuka, keberadaan mereka sangat dibutuhkan untuk mengontrol populasi ikan lain agar ekosistem tetap seimbang.' },
  { img: kurisi,      name: 'Ikan Kurisi (Threadfin Bream)',               desc: 'Ikan demersal berwarna kemerahan dengan sirip benang panjang yang hidup berkelompok di dasar laut.', 
    info: 'Ikan Kurisi adalah penghuni dasar laut berpasir yang memiliki ciri khas warna perak kemerahan dengan sirip kuning yang menjuntai panjang. Ikan ini biasanya hidup berkelompok dengan ukuran rata-rata 15 hingga 22 cm. Selain memiliki peran penting dalam ekosistem laut, bentuknya yang unik membuat ikan ini sangat mudah dikenali di habitatnya.' },
  { img: hiuMartil,   name: 'Hiu Martil (Hammerhead Shark)',               desc: 'Predator berkepala martil dengan pandangan 360 derajat dan sensor listrik untuk mendeteksi mangsa.', 
    info: 'Hiu Martil adalah predator laut dari keluarga Sphyrnidae yang memiliki kepala unik berbentuk martil. Bentuk ini membantu mereka berenang lebih lincah dan memberikan pandangan luas hingga 360 derajat untuk berburu. Dengan panjang mencapai 6 meter, hiu ini dikenal sebagai pemburu yang sangat efisien di lautan.' },
  { img: pausPilot,   name: 'Paus Pilot (Globicephala)',                   desc: 'Dolphin besar berkepala bulat tanpa moncong yang hidup berkelompok di bawah satu pemimpin.', 
    info:'Paus Pilot adalah lumba-lumba raksasa berkepala bulat tanpa moncong yang sering dijuluki "ikan hitam". Tubuhnya berwarna gelap dengan corak menyerupai jangkar di bagian dada. Spesies ini menunjukkan perbedaan ukuran yang nyata, di mana jantan bisa tumbuh hingga 7 meter, sementara betina hanya sekitar 5 meter.' },
  { img: barracuda,   name: 'Great Barracuda (Sphyraena barracuda)',       desc: 'Ikan pemangsa bertubuh panjang dengan rahang kuat dan gigi taring tajam menyerupai tombak.', 
    info:'Barakuda besar adalah ikan memanjang dengan rahang yang kuat . Rahang bawah dari mulutnya yang besar menonjol lebih jauh daripada rahang atasnya . Barakuda memiliki gigi yang kuat, seperti taring , yang ukurannya tidak sama, tertanam di rongga pada rahang dan di langit-langit mulut . Kepalanya cukup besar, runcing, dan tampak seperti ikan tombak.' },
  { img: blackfin,    name: 'Blackfin Barracuda (Sphyraena qenie)',        desc: 'Ikan pemangsa dengan 18-22 pita hitam berbentuk V yang melingkari tubuhnya.', 
    info:'Barakuda Sirip Hitam adalah ikan pemangsa yang dapat tumbuh hingga 140 cm. Ciri khas utamanya adalah adanya 18 sampai 22 pita hitam berbentuk huruf "V" yang melingkari tubuhnya. Jumlah dan bentuk pita yang menghadap ke depan ini menjadi pembeda utama spesies ini dari jenis barakuda lainnya di lautan.' },
  { img: bandedKrait, name: 'Banded Sea Krait (Laticauda colubrina)',      desc: 'Ular laut berkepala hitam dengan bibir dan moncong berwarna kuning yang memanjang ke belakang mata.', info:'Kepala ular laut bibir kuning berwarna hitam, dengan lubang hidung lateral dan sisik rostral yang tidak terbagi . Bibir atas dan moncongnya berwarna kuning, dan warna kuning tersebut memanjang ke belakang di setiap sisi kepala di atas mata hingga sisik temporal.' },
  { img: oliveSnake,  name: 'Olive Sea Snake (Aipysurus laevis)',          desc: 'Ular laut berukuran besar berwarna zaitun kecoklatan yang aktif di malam hari.', 
    info:'Ular Laut Zaitun adalah ular berbisa tinggi sepanjang 1,25 meter yang hidup di terumbu karang. Ciri utamanya adalah ekor berbentuk dayung untuk berenang dan kebiasaan muncul ke permukaan hanya untuk bernapas.' },
  { img: ikanBadut,   name: 'Ikan Badut / Ikan Giru (Amphiprion)',         desc: 'Ikan kecil berwarna cerah yang bersimbiosis mutualistis dengan anemon laut.', 
    info:'Ikan Badut adalah ikan hias populer berwarna jingga atau merah dengan garis putih cerah. Ikan ini hidup harmonis dengan anemon laut dalam hubungan simbiosis yang saling melindungi dan memberi nutrisi. Keberadaan mereka di terumbu karang Indo-Pasifik menjadi simbol interaksi alam yang unik dan indah.' },
  { img: butterfly,   name: 'Ikan Kepe-kepe (Butterflyfish)',              desc: 'Ikan berwarna-warni yang hidup berpasangan di terumbu karang, memakan polip karang.', 
    info:'Ikan Kepe-kepe adalah ikan karang bertubuh pipih dengan warna-warna cerah seperti kuning dan jingga. Ikan ini hidup berpasangan dan sering menjadi indikator kesehatan terumbu karang karena kebiasaan makannya yang bergantung pada polip karang.' },
  { img: mandarin,    name: 'Ikan Mandarin (Synchiropus splendidus)',      desc: 'Ikan paling berwarna di lautan; aktif di malam hari untuk mencari pasangan di terumbu karang.', 
    info:'Ikan Mandarin merupakan ikan hias ikonik dengan tubuh berwarna biru cerah yang dihiasi pola garis hijau, jingga, dan kuning. Ikan berukuran sekitar 6 hingga 15 cm ini hidup bersembunyi di celah terumbu karang untuk menghindari pemangsa. Mereka aktif mencari makan berupa krustasea kecil dan invertebrata, terutama pada waktu pagi serta malam hari.'},
  { img: sersan,      name: 'Ikan Sersan (Pomacentridae)',            desc: 'Ikan territorial kecil bercorak belang hitam-putih yang rajin menjaga wilayah telurnya.', 
    info:'Dengan ciri khas warna keperakan dengan garis-garis gelap keabu-abuan atau kehitaman, tubuhnya bisa mencapai sekitar 22,9 cm, memiliki sirip yang khas (terutama sirip ekor bercabang dan sirip dorsal dengan pita gelap), dan sering ditemukan di perairan karang tropis dan subtropis.' },
  { img: singa,       name: 'Ikan Singa (Lionfish)',                        desc: 'Predator diam berbahan duri berbisa yang menyergap mangsa dengan sirip kipas indahnya.', 
    info:'Ikan Lionfish adalah ikan hias yang memiliki sirip melebar seperti kipas dan corak warna mencolok. Meski indah, ikan predator ini memiliki duri berbisa yang berbahaya dan bisa merusak ekosistem jika populasinya terlalu banyak.' },
  { img: triggerfish, name: 'Ikan Triggerfish Hitam',                       desc: 'Ikan herbivora bertaring kuat yang memakan bulu babi dan membantu menjaga keseimbangan terumbu karang.', info:'Ikan yang mempesona adalah salah satu jenis Triggerfish yang paling tidak agresif dan mudah dipelihara di akuarium yang lebih besar. Ikan cerdas ini tidak hanya dapat belajar makan dari tangan Anda, tetapi juga mampu mengeluarkan suara dalam beberapa cara berbeda. Kunci keberhasilan memelihara spesies ini adalah menyediakan ruang berenang yang luas.' },
  { img: penyuHijau,  name: 'Penyu Hijau (Chelonia mydas)',                 desc: 'Penyu besar yang bermigrasi ribuan km untuk bertelur; herbivora pemakan lamun dan alga.', 
    info:'Penyu Hijau adalah penyu laut besar dari keluarga Cheloniidae yang hidup di perairan tropis. Namanya diambil dari warna lemak di bawah cangkangnya, bukan dari warna kulitnya. Akibat perburuan liar untuk diambil cangkang dan telurnya, populasi penyu ini kini terancam punah dan sangat dilindungi.' },
  { img: penyuSisik,  name: 'Penyu Sisik (Eretmochelys imbricata)',         desc: 'Penyu kritis terancam punah dengan paruh seperti elang, pemakan spons laut.', 
    info:'Penyu Sisik adalah penyu samudra bertubuh datar dengan ciri khas paruh melengkung dan pinggiran cangkang yang bergerigi menyerupai gergaji. Uniknya, warna cangkang penyu ini dapat berubah mengikuti suhu air di sekitarnya.' },
  { img: pygmy,       name: 'Pygmy Seahorse',                               desc: 'Kuda laut terkecil di dunia yang berkamuflase sempurna di antara karang kipas (sea fan).', 
    info:'Pygmy Seahorse adalah salah satu spesies kuda laut terkecil di dunia yang banyak ditemukan di kawasan Segitiga Karang, Asia Tenggara. Dengan tinggi kurang dari 2 sentimeter, ikan dari keluarga Syngnathidae ini memiliki mulut berbentuk tabung untuk menghisap makanan.' },
]

/* ============================================================
   Modal Component
   ============================================================ */
function FaunaModal({ selectedIndex, setSelectedIndex, onClose }) {
  if (selectedIndex === null) return null;

  const item = faunaData[selectedIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? faunaData.length - 1 : prev - 1));
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === faunaData.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 sm:p-6 bg-[#00040A]/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-[#020e1f] border border-[#7CA1D3]/40 rounded-[2rem] max-w-3xl w-[92%] sm:w-full flex flex-col shadow-2xl h-[65vh] sm:h-[75vh] max-h-[700px] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Tombol Close (X) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[60] bg-[#7CA1D3]/20 border border-[#7CA1D3]/50 text-white hover:bg-[#7CA1D3]/50 rounded-full p-2 transition-all shadow-md backdrop-blur-sm"
            aria-label="Tutup modal"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          {/* =========================================
              BAGIAN ATAS (Judul & Foto)
              ========================================= */}
          <div className="flex-none pt-14 sm:pt-8 px-4 sm:px-12 pb-3 sm:pb-4 flex flex-col items-center relative z-10 bg-[#020e1f]">
            
            {/* Judul */}
            <h3 className="text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-5 text-center px-4 sm:px-8 leading-tight w-full">
              {item.name}
            </h3>

            {/* Wadah Foto & Chevron */}
            <div className="relative w-full sm:w-[85%] lg:w-[75%] flex justify-center items-center">
              
              <button
                onClick={handlePrev}
                className="absolute left-0 sm:-left-12 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#7CA1D3] bg-[#020e1f]/90 backdrop-blur hover:bg-[#7CA1D3]/30 flex items-center justify-center text-white shadow-lg transition-colors"
              >
                <ChevronLeft size={22} />
              </button>

              <img 
                src={item.img} 
                alt={item.name} 
                className="w-40 h-40 sm:w-auto sm:h-48 aspect-square sm:aspect-video object-cover rounded-xl shadow-lg border border-white/5" 
              />

              <button
                onClick={handleNext}
                className="absolute right-0 sm:-right-12 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#7CA1D3] bg-[#020e1f]/90 backdrop-blur hover:bg-[#7CA1D3]/30 flex items-center justify-center text-white shadow-lg transition-colors"
              >
                <ChevronRight size={22} />
              </button>

            </div>
          </div>

          {/* =========================================
              BAGIAN BAWAH (Deskripsi Scrollable)
              ========================================= */}
          <div 
            className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-16 pt-2 pb-10 relative"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(124, 161, 211, 0.5) transparent' }}
          >
            <p className="text-white/80 leading-relaxed text-sm sm:text-base text-left sm:text-justify w-full">
              {item.info}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#020e1f] to-transparent pointer-events-none z-10"></div>
        </motion.div>

        {/* Pagination Angka di Modal */}
        <div 
          className="mt-5 z-10"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 px-6 py-2 border border-[#7CA1D3] rounded-[2rem] bg-[#020e1f]/80 backdrop-blur-sm text-base font-bold shadow-md">
            <span className="text-white">{selectedIndex + 1}</span>
            <span className="text-[#7CA1D3] font-medium">/</span>
            <span className="text-white/70">{faunaData.length}</span>
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
   Main Fauna Section
   ============================================================ */
export default function Fauna() {
  const [page, setPage] = useState(0)
  const [modalIndex, setModalIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const itemsPerPage = isMobile ? 1 : 4
  const totalPages = Math.ceil(faunaData.length / itemsPerPage)

  useEffect(() => {
    if (page >= totalPages && totalPages > 0) {
      setPage(0)
    }
  }, [totalPages])

  const visibleItems = faunaData.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)

  const prevPage = () => setPage(p => (p === 0 ? totalPages - 1 : p - 1))
  const nextPage = () => setPage(p => (p === totalPages - 1 ? 0 : p + 1))

  // Autoplay slider
  useEffect(() => {
    const timer = setInterval(() => {
      if (modalIndex === null) {
        setPage(p => (p === totalPages - 1 ? 0 : p + 1))
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [totalPages, modalIndex])

  // --- Memisahkan string untuk animasi split text ---
  const headerLine1 = "Beragam ikan dan biota laut hidup di".split(" ")
  const headerLine2 = "perairan tropis yang masih alami.".split(" ")

  return (
    <section id="fauna" className="relative py-24 bg-gradient-to-b from-[#010F1F]/70 to-[#000]/70 overflow-hidden">

      <div className="relative z-[1] max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center justify-center border border-white/30 rounded-full px-6 py-2 text-[#7CA1D3] font-bold tracking-widest uppercase text-xl">
            Fauna
          </span>
          
          {/* ====================================================
              BAGIAN YANG DIUBAH: React Bits Split Text Style 
              Trigger via whileInView (scroll)
              ==================================================== */}
          <motion.h2 
            variants={{
              hidden: { opacity: 1 },
              visible: { 
                opacity: 1, 
                transition: { 
                  staggerChildren: 0.08, // Jeda muncul antar kata
                  delayChildren: 0.3     // Jeda sebelum animasi kata pertama mulai
                } 
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-4 text-3xl sm:text-4xl font-bold text-white"
          >
            {headerLine1.map((word, i) => (
              <motion.span 
                key={`hl1-${i}`} 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { type: 'spring', damping: 15, stiffness: 150 } 
                  }
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
            <br className="hidden sm:block" />
            {headerLine2.map((word, i) => (
              <motion.span 
                key={`hl2-${i}`} 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { type: 'spring', damping: 15, stiffness: 150 } 
                  }
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          {/* ==================================================== */}

        </motion.div>

        {/* Cards Wrapper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
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
                className="w-full max-w-md sm:max-w-none"
              >
                <div
                  className="relative rounded-2xl overflow-hidden cursor-pointer group transition-transform duration-500 hover:scale-[1.03]"
                  onClick={() => setModalIndex(realIndex)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-72 sm:h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5">
                    <h5 className="text-white font-semibold text-lg sm:text-sm leading-snug">{item.name}</h5>
                  </div>
                </div>
                <p className="mt-4 sm:mt-3 text-white/60 text-base sm:text-sm leading-relaxed px-1">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Pagination Halaman Utama */}
        <div className="flex items-center justify-center gap-4 mt-12 sm:mt-14">
          <button onClick={prevPage} className="w-12 h-12 sm:w-11 sm:h-11 rounded-full border border-[#7CA1D3] bg-transparent hover:bg-white/10 transition-colors flex items-center justify-center text-white shrink-0">
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center px-2 py-1.5 sm:px-4 sm:py-2 border border-[#7CA1D3] rounded-[2rem] bg-transparent">
            {isMobile ? (
              <div className="px-5 py-2 bg-[#7CA1D3] text-white rounded-full text-base font-bold shadow-md flex items-center gap-2">
                <span>{page + 1}</span>
                <span className="text-white/60 font-medium">/</span>
                <span className="text-white/90">{totalPages}</span>
              </div>
            ) : (
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold transition-all duration-300 ${
                      i === page ? 'bg-[#7CA1D3] text-white shadow-md' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={nextPage} className="w-12 h-12 sm:w-11 sm:h-11 rounded-full border border-[#7CA1D3] bg-transparent hover:bg-white/10 transition-colors flex items-center justify-center text-white shrink-0">
            <ChevronRight size={20} />
          </button>
        </div>

      </div>

      <FaunaModal 
        selectedIndex={modalIndex} 
        setSelectedIndex={setModalIndex} 
        onClose={() => setModalIndex(null)} 
      />
    </section>
  )
}