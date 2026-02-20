import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import circleSvg from '../assets/circle.svg'

/* ============================================================
   Import semua gambar flora
   ============================================================ */
import terumbu    from '../assets/flora/Terumbu Karang (Coral Reefs).svg'
import kima       from '../assets/flora/Kima (Giant Clams).svg'
import lamun      from '../assets/flora/Padang Lamun (Seagrass Beds).svg'
import alga       from '../assets/flora/Alga Laut (Marine Algae).svg'
import valonia    from '../assets/flora/Valonia Ventricosa.svg'
import ulva       from '../assets/flora/Ulva Lactua.svg'
import acantho    from '../assets/flora/Acanthophora Spicifera.svg'
import galaxaura  from '../assets/flora/Galaxaura sp..svg'
import gracilaria from '../assets/flora/Gracilaria sp..svg'
import eucheuma   from '../assets/flora/Eucheuma cottonii.svg'
import dictyota   from '../assets/flora/Dictyota sp..svg'
import caulerpaR  from '../assets/flora/Caulerpa racemosa.svg'
import caulerpaS  from '../assets/flora/Caulerpa sertularioides.svg'
import cymodoceaR from '../assets/flora/Cymodocea rotundata.svg'
import cymodoceaS from '../assets/flora/Cymodocea serrulata.svg'
import enhalus    from '../assets/flora/Enhalus acoroides.svg'
import halimeda   from '../assets/flora/Halimeda sp..svg'
import halodule   from '../assets/flora/Halodule uninervis.svg'
import halophila  from '../assets/flora/Halophila ovalis.svg'
import padina     from '../assets/flora/Padina sp..svg'
import sargassum  from '../assets/flora/Sargassum sp. .svg'
import syringodium from '../assets/flora/Syringodium isoetifolium.svg'
import thalassia  from '../assets/flora/Thalassia hemprichii .svg'
import turbinaria from '../assets/flora/Turbinaria sp..svg'

/* ============================================================
   Data Flora
   ============================================================ */
const floraData = [
  { img: terumbu,     name: 'Terumbu Karang (Coral Reefs)',       desc: 'Ekosistem laut yang dibentuk oleh karang keras dan penting sebagai habitat utama biota laut.', 
    info:'Terumbu Karang Laut Banda adalah ekosistem bawah laut di Kepulauan Banda yang kaya akan ratusan spesies ikan dan didominasi oleh karang jenis Acropora. Selain menjadi habitat alami yang sangat beragam, area ini memiliki nilai ekonomi penting namun kini terancam oleh pencemaran dan aktivitas manusia.' },
  { img: kima,        name: 'Kima (Giant Clams)',                 desc: 'Moluska besar yang menyumbang kalsium karbonat untuk pertumbuhan terumbu karang.', 
    info:'Kima adalah kerang laut raksasa yang hidup menempel di terumbu karang perairan Indo-Pasifik. Kerang ini berperan penting dalam pembentukan karang melalui cangkangnya yang kaya kalsium karbonat dan melakukan fotosintesis berkat simbiosis dengan alga zooxanthellae.' },
  { img: lamun,       name: 'Padang Lamun (Seagrass Beds)',       desc: 'Habitat laut yang menyediakan sumber makanan dan tempat perlindungan bagi berbagai ikan dan penyu.', 
    info:'Padang Lamun adalah ekosistem tumbuhan laut dangkal yang berfungsi sebagai tempat mencari makan dan perlindungan bagi ikan, penyu, serta hewan laut lainnya. Ekosistem ini berperan penting sebagai "tempat asuhan" bagi ikan muda, penstabil dasar laut, penyerap karbon, serta penjaga kejernihan air.' },
  { img: alga,        name: 'Alga Laut (Marine Algae)',           desc: 'Produsen primer yang mendukung rantai makanan laut dan membantu stabilitas terumbu karang.', 
    info:'Alga Laut adalah organisme fotosintetik yang berfungsi sebagai produsen utama dalam rantai makanan laut. Selain menghasilkan bahan organik dan oksigen bagi biota lain, alga juga membantu menjaga keseimbangan ekosistem dengan menyerap nutrisi berlebih dan mendukung stabilitas terumbu karang.' },
  { img: valonia,     name: 'Valonia Ventricosa',                 desc: 'Organisme sel tunggal raksasa berbentuk bola hijau mengkilap yang menghuni sela-sela karang Banda.', 
    info:'Alga Bola Mata (bubble alga) adalah flora unik berbentuk bulatan hijau tua mengkilap seperti kelereng. Meskipun terlihat seperti buah kecil, satu bulatan ini sebenarnya adalah satu sel raksasa, menjadikannya salah satu organisme bersel tunggal terbesar di dunia yang hidup di sela-sela karang.' },
  { img: ulva,        name: 'Ulva Lactua',                        desc: 'Alga hijau berbentuk lembaran tipis bergelombang yang menjadi sumber makanan utama ikan herbivora.', 
    info:'Sering disebut sebagai selada laut, alga hijau ini memiliki bentuk berupa lembaran tipis transparan yang sangat lebar dan bergelombang di bagian pinggirnya. Ulva biasanya tumbuh dengan sangat cepat di area yang memiliki kandungan nutrisi tinggi, dan lembarannya yang lembut menjadi sumber makanan bagi berbagai jenis ikan herbivora di sekitar kepulauan.'
   },
  { img: acantho,     name: 'Acanthophora Spicifera',             desc: 'Alga merah bertekstur duri tumpul yang tumbuh menempel pada substrat keras di area pasang surut.', 
    info:'Alga merah ini memiliki ciri khas yang sangat mencolok berupa duri-duri kecil yang tumbuh di sepanjang cabang-cabangnya, memberikan tampilan yang "berduri" namun sebenarnya tumpul. Ia sangat adaptabel dan sering ditemukan tumbuh menempel pada substrat keras seperti batu atau cangkang kerang di area pasang surut yang sering terkena sinar matahari.' },
  { img: galaxaura,   name: 'Galaxaura sp.',                      desc: 'Alga merah berkandungan kapur yang tumbuh membentuk koloni rimbun di dasar laut.', 
    info:'Flora ini merupakan jenis alga merah yang memiliki kandungan kapur di dalam jaringannya, sehingga tubuhnya terasa agak kaku dan rapuh jika dipegang. Galaxaura biasanya tumbuh membentuk koloni rimbun menyerupai semak kecil di dasar laut dengan warna merah muda atau jingga yang menambah keberagaman warna di ekosistem laut Banda.' },
  { img: gracilaria,  name: 'Gracilaria sp.',                     desc: 'Alga merah bercabang silindris yang menjadi bahan baku utama pembuatan agar-agar.', 
    info:'Alga merah ini memiliki bentuk cabang yang panjang dan silindris mirip dengan kabel-kabel halus yang saling menjuntai, biasanya berwarna merah tua atau kecokelatan. Gracilaria tumbuh subur di perairan yang tenang dan merupakan bahan baku utama dalam pembuatan agar-agar yang sudah lama dipanen oleh penduduk pesisir secara tradisional.' },
  { img: eucheuma,    name: 'Eucheuma cottonii',                  desc: 'Rumput laut kenyal berdaging tebal yang menjadi komoditas penting sebagai penghasil karagenan.', 
    info:'Rumput laut ini memiliki tubuh yang berdaging tebal dan kenyal dengan banyak tonjolan-tonjolan tumpul di seluruh permukaannya. Eucheuma merupakan komoditas ekonomi yang sangat penting di wilayah Maluku karena mengandung karagenan yang digunakan sebagai bahan pengental dalam berbagai industri makanan dan kosmetik di seluruh dunia.' },
  { img: dictyota,    name: 'Dictyota sp.',                       desc: 'Alga coklat lembaran tipis berkilau dengan tepi bergerigi yang menghiasi lereng terumbu karang.', 
    info:'Dictyota adalah alga cokelat yang memiliki pola percabangan sangat teratur, di mana setiap cabangnya selalu terbagi menjadi dua bagian yang sama (dikotom). Ia biasanya tumbuh membentuk rumpun yang rimbun di area terumbu karang yang mati, memberikan tekstur dan warna cokelat keemasan yang kontras di bawah air yang jernih.' },
  { img: caulerpaR,   name: 'Caulerpa racemosa',                  desc: 'Alga hijau berbentuk bola kecil bergerombol seperti anggur, hidup di dasar berpasir.', 
    info:'Populer dengan nama anggur laut atau "latoh", alga hijau ini memiliki cabang yang dipenuhi bulatan-bulatan kecil menyerupai butiran buah anggur hijau yang segar. Selain menjadi pemandangan indah di dasar laut, jenis ini juga sering dimanfaatkan oleh masyarakat lokal sebagai bahan pangan alami yang kaya akan vitamin dan mineral.' },
  { img: caulerpaS,   name: 'Caulerpa sertularioides',            desc: 'Alga hijau menyerupai bulu unggas yang merayap cepat pada substrat pasir dan karang mati.', 
    info:'Alga ini tumbuh merayap di dasar laut dengan cabang-cabang vertikal yang bentuknya menyerupai helai bulu burung atau daun pakis yang sangat halus. Warnanya yang hijau terang dan teksturnya yang lembut menjadikannya salah satu flora laut yang paling estetis, seringkali ditemukan menghiasi celah-celah di antara gundukan terumbu karang.' },
  { img: cymodoceaR,  name: 'Cymodocea rotundata',                desc: 'Lamun berdaun lebar dengan ujung membulat yang menjadi pakan favorit penyu hijau.', 
    info:'Lamun ini mudah dikenali dari ujung daunnya yang berbentuk bulat sempurna dan halus tanpa gerigi, sering ditemukan tumbuh rapat di daerah dangkal yang terkena cahaya matahari penuh. Keberadaannya sangat penting bagi biota kecil seperti udang dan ikan muda karena kerapatan daunnya memberikan perlindungan yang sangat efektif dari kejaran predator.' },
  { img: cymodoceaS,  name: 'Cymodocea serrulata',                desc: 'Lamun dengan tepi daun bergerigi halus yang mendominasi padang lamun campuran.', 
    info:'Berbeda dengan kerabatnya, jenis ini memiliki ciri khas pada ujung daun yang berbentuk datar dan memiliki gerigi-gerigi kecil (serrated) yang bisa dirasakan jika disentuh. Tumbuhan ini biasanya tumbuh di substrat yang lebih kasar atau berlumpur dan memiliki kemampuan adaptasi yang baik terhadap perubahan salinitas air laut di sekitar pesisir pulau.' },
  { img: enhalus,     name: 'Enhalus acoroides',                  desc: 'Lamun terbesar Asia Tenggara dengan daun pita panjang yang menjadi habitat dugong.', 
    info:'Lamun ini merupakan jenis yang paling besar dan kuat di perairan Banda Neira, dengan daun panjang yang bisa mencapai satu meter lebih menyerupai pita hijau tua yang kaku. Karena ukurannya yang besar, ia memiliki sistem akar yang sangat dalam dan kuat untuk mencengkeram dasar laut, sehingga berperan penting dalam menjaga kestabilan sedimen dan mencegah erosi pantai akibat arus laut yang kuat.' },
  { img: halimeda,    name: 'Halimeda sp.',                       desc: 'Alga hijau berkapur berbentuk cakram berrantai yang berperan dalam pembentukan pasir koral.', 
    info:'Alga hijau ini tersusun dari segmen-segmen pipih berbentuk jantung atau ginjal yang mengandung zat kapur sangat tinggi sehingga teksturnya cukup keras. Halimeda memiliki peran geologis yang besar karena ketika alga ini mati, bagian tubuhnya yang berkapur akan hancur dan berubah menjadi butiran pasir putih yang membentuk pantai-pantai indah di Kepulauan Banda.' },
  { img: halodule,    name: 'Halodule uninervis',                 desc: 'Lamun pioneir berdaun sempit yang cepat tumbuh di area terganggu sebagai spesies pioner.', 
    info:'Lamun pionir ini memiliki daun yang sangat sempit dan tipis, dengan ciri khas ujung daun yang memiliki tiga gigi kecil (trisula) yang hanya terlihat jelas di bawah lup. Ia sering menjadi tumbuhan pertama yang mengkolonisasi area dasar laut yang baru terbuka atau terganggu, membantu mempersiapkan kondisi lingkungan agar jenis lamun lain yang lebih besar bisa tumbuh kemudian.' },
  { img: halophila,   name: 'Halophila ovalis',                   desc: 'Lamun kecil berbentuk oval yang hidup di kedalaman besar dengan cahaya rendah.', 
    info:'Flora ini memiliki bentuk yang sangat unik karena daunnya yang kecil berbentuk oval menyerupai sendok atau telur, tumbuh berpasangan pada batang yang merayap di bawah pasir. Meskipun terlihat rapuh, Halophila ovalis sangat tangguh dan mampu tumbuh di berbagai kedalaman, menjadikannya salah satu penyedia oksigen penting di area dasar laut yang berpasir halus.' },
  { img: padina,      name: 'Padina sp.',                         desc: 'Alga coklat berbentuk kipas berlapis kalsium putih yang indah di terumbu karang dangkal.', 
    info:'Dikenal dengan sebutan alga kipas, Padina memiliki lembaran tubuh yang melebar membentuk kipas dengan garis-garis konsentris yang cantik di permukaannya. Bagian tubuhnya seringkali terlihat berwarna keputihan karena adanya lapisan kalsium karbonat, yang membuatnya unik di antara jenis alga cokelat lainnya di perairan dangkal Banda.' },
  { img: sargassum,   name: 'Sargassum sp.',                      desc: 'Alga coklat bercabang banyak dengan gelembung udara yang menjadi habitat ribuan organisme kecil.', 
    info:'Alga cokelat ini sangat ikonik karena memiliki struktur mirip batang dan daun tumbuhan darat, serta dilengkapi dengan "bladder" atau kantong udara bulat kecil berisi gas. Kantong udara ini berfungsi sebagai pelampung agar tubuh alga tetap tegak menuju permukaan laut untuk menyerap cahaya matahari maksimal guna proses fotosintesis.' },
  { img: syringodium, name: 'Syringodium isoetifolium',           desc: 'Lamun berdaun bulat panjang menyerupai tabung yang tumbuh di perairan jernih dangkal.', 
    info:'Jenis lamun ini sangat unik karena daunnya tidak berbentuk pita datar, melainkan silindris bulat menyerupai lidi atau mie yang lentur. Bentuk daun yang aerodinamis ini memungkinkan Syringodium untuk bertahan di area dengan arus laut yang cukup kencang tanpa risiko daunnya sobek, sekaligus memberikan tekstur habitat yang berbeda bagi mikroorganisme laut.' },
  { img: thalassia,   name: 'Thalassia hemprichii',               desc: 'Lamun kuat berdaun seperti pita yang mendominasi padang lamun tropis Asia.', 
    info:'Sering disebut sebagai "lamun dugong", tumbuhan ini memiliki rimpang yang sangat tebal dan daun yang melengkung pendek, biasanya tumbuh membentuk hamparan luas di rataan terumbu. Padang lamun ini adalah ekosistem yang sangat produktif karena menjadi tempat mencari makan utama bagi penyu hijau dan mamalia laut dugong yang sering melintasi perairan Maluku.' },
  { img: turbinaria,  name: 'Turbinaria sp.',                     desc: 'Alga coklat berbentuk corong berlapis yang membentuk koloni padat di terumbu terbuka.', 
    info:'Flora laut ini memiliki tekstur yang sangat keras dan kaku, dengan bentuk daun yang menyerupai corong atau payung terbalik yang tepinya bergerigi tajam. Turbinaria biasanya melekat sangat kuat pada bebatuan karang di area yang terkena hempasan ombak kuat, karena struktur tubuhnya yang kokoh mampu menahan tekanan mekanis dari energi laut.' },
]

const ITEMS_PER_PAGE = 4

/* ============================================================
   Modal
   ============================================================ */
function FloraModal({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-card rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-accent text-white rounded-full p-1.5 transition-colors"
            >
              <X size={18} />
            </button>
            <img src={item.img} alt={item.name} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
              <p className="text-white/70 leading-relaxed text-sm">{item.info}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ============================================================
   Card animation variants
   ============================================================ */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

/* ============================================================
   Flora Section
   ============================================================ */
export default function Flora() {
  const [page, setPage] = useState(0)
  const [modal, setModal] = useState(null)

  const totalPages = Math.ceil(floraData.length / ITEMS_PER_PAGE)
  const visible = floraData.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE)

  const prev = () => setPage(p => Math.max(0, p - 1))
  const next = () => setPage(p => Math.min(totalPages - 1, p + 1))

  return (
    <section id="flora" className="relative py-24 bg-primary overflow-hidden">
      {/* Decorative circles */}
      <img src={circleSvg} alt="" aria-hidden className="absolute -bottom-20 -right-20 w-72 opacity-20 pointer-events-none" />

      <div className="relative z-[1] max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center justify-center border border-white/30 rounded-full px-6 py-2 text-light-blue font-bold tracking-widest uppercase text-xl">
            Flora
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
            Macam flora laut Banda yang menjaga<br className="hidden sm:block" /> keseimbangan ekosistemnya
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((item, i) => (
            <motion.div
              key={`${page}-${i}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div
                className="relative rounded-2xl overflow-hidden cursor-pointer group transition-transform duration-500 hover:scale-[1.03]"
                onClick={() => setModal(item)}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h5 className="text-white font-semibold text-sm leading-snug">{item.name}</h5>
                </div>
              </div>
              <p className="mt-3 text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={prev}
            disabled={page === 0}
            className="w-10 h-10 rounded-full border-1 border-light-blue bg-dark hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-white"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === page ? 'bg-accent scale-125' : 'bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={page === totalPages - 1}
            className="w-10 h-10 rounded-full border-1 border-light-blue bg-dark hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Modal */}
      <FloraModal item={modal} onClose={() => setModal(null)} />
    </section>
  )
}
