import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ImageWithSkeleton({ src, alt, wrapperClassName, imgClassName }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-[#7CA1D3]/10 ${wrapperClassName}`}>
      {/* Skeleton / Placeholder yang loading */}
      {!isLoaded && (
        <div className="absolute inset-0 z-0 animate-pulse bg-[#7CA1D3]/20" />
      )}
      
      {/* Gambar Aslinya */}
      <motion.img
        key={src} // Ini kunci rahasianya biar state kereset otomatis tiap gambar ganti
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        onLoad={() => setIsLoaded(true)}
        className={`relative z-10 ${imgClassName}`}
      />
    </div>
  )
}