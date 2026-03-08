import React from 'react'
import circleSvg from '../assets/circle.webp'
import ikanKecil from '../assets/ikan kecil.webp'

export default function OceanBackground() {
  const base = "absolute mix-blend-screen pointer-events-none select-none opacity-0";

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#07101E]">
      
      {/* === PASUKAN GELEMBUNG (Visibilitas Tinggi) === */}
      {/* Kiri */}
      <img src={circleSvg} className={`${base} left-[5%] -bottom-16 w-5 b-visible`} alt="" />
      <img src={circleSvg} className={`${base} left-[15%] -bottom-16 w-8 b-visible b-delay-2 blur-[1px]`} alt="" />
      
      {/* Tengah */}
      <img src={circleSvg} className={`${base} left-[35%] -bottom-16 w-4 b-visible b-delay-1`} alt="" />
      <img src={circleSvg} className={`${base} left-[50%] -bottom-16 w-10 b-visible b-delay-3 blur-[2px]`} alt="" />
      <img src={circleSvg} className={`${base} left-[60%] -bottom-16 w-6 b-visible`} alt="" />
      
      {/* Kanan */}
      <img src={circleSvg} className={`${base} left-[80%] -bottom-16 w-9 b-visible b-delay-2 blur-[1px]`} alt="" />
      <img src={circleSvg} className={`${base} left-[92%] -bottom-16 w-4 b-visible b-delay-1`} alt="" />
      <img src={circleSvg} className={`${base} left-[20%] -bottom-16 w-6 b-visible b-delay-3 delay-[8s]`} alt="" />

      {/* === PASUKAN IKAN (Anti-Mundur) === */}
      <img src={ikanKecil} className={`${base} top-[25%] w-16 i-fast`} alt="" />
      <img src={ikanKecil} className={`${base} top-[55%] w-12 i-med`} alt="" />
      <img src={ikanKecil} className={`${base} top-[85%] w-8 i-slow blur-[1px]`} alt="" />

    </div>
  )
}