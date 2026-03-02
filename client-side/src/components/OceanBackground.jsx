import React from 'react'
import circleSvg from '../assets/circle.webp'
import ikanKecil from '../assets/ikan kecil.webp'

export default function OceanBackground() {
  // Efek bayangan yang jauh lebih tipis dan halus agar tidak mencolok
  const subtleGlow = "drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]";

  return (
    <div className="fixed inset-0 z-[0] overflow-hidden pointer-events-none">
      
      {/* === GELEMBUNG AIR === */}
      <img src={circleSvg} className={`absolute left-[10%] -bottom-20 w-16 opacity-0 animate-bubble delay-1 motion-reduce:hidden ${subtleGlow}`} alt="" />
      <img src={circleSvg} className={`absolute left-[35%] -bottom-20 w-24 opacity-0 animate-bubble delay-2 motion-reduce:hidden ${subtleGlow}`} alt="" />
      <img src={circleSvg} className={`absolute left-[50%] -bottom-20 w-10 opacity-0 animate-bubble delay-2 motion-reduce:hidden ${subtleGlow}`} alt="" />
      <img src={circleSvg} className={`absolute left-[70%] -bottom-20 w-12 opacity-0 animate-bubble delay-3 motion-reduce:hidden ${subtleGlow}`} alt="" />
      <img src={circleSvg} className={`absolute left-[85%] -bottom-20 w-32 opacity-0 animate-bubble delay-4 motion-reduce:hidden ${subtleGlow}`} alt="" />

      {/* === IKAN KECIL (Ukuran Sudah Diperkecil) === */}
      {/* Ikan 1: Kiri ke Kanan (Atas) - Sekarang w-12 */}
      <img src={ikanKecil} className={`absolute top-[25%] -left-32 w-12 opacity-0 animate-swim-right delay-1 motion-reduce:hidden ${subtleGlow}`} alt="" />
      
      {/* Ikan 2: Kanan ke Kiri (Tengah) - Sekarang w-10 */}
      <img src={ikanKecil} className={`absolute top-[60%] -right-32 w-10 opacity-0 animate-swim-left delay-3 motion-reduce:hidden ${subtleGlow}`} alt="" />

      {/* Ikan 3: Kiri ke Kanan (Bawah, Lebih Lambat) - Sekarang w-8 */}
      <img src={ikanKecil} className={`absolute top-[85%] -left-32 w-8 opacity-0 animate-swim-right delay-4 motion-reduce:hidden ${subtleGlow}`} alt="" />
    </div>
  )
}