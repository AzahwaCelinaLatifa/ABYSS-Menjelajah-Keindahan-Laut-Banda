import React, { useEffect, useRef } from 'react';
import circleSvg from '../assets/circle.webp';
import ikanKecil from '../assets/ikan kecil.webp';

const DodgeElement = ({ src, parentClassName, imgClassName, alt }) => {
  const imgRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    // Mengecek apakah pengguna mengaktifkan mode "Kurangi Animasi" di HP/PC mereka
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // Hentikan interaksi jika pengguna sensitif terhadap gerakan

    const handleMove = (e) => {
      if (!imgRef.current) return;
      
      const rect = imgRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = clientX - x;
      const dy = clientY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const interactionRadius = 120; 

      if (requestRef.current) cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (!imgRef.current) return;
        
        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          const pushX = -(dx / distance) * force * 50; 
          const pushY = -(dy / distance) * force * 50;
          
          imgRef.current.style.transform = `translate(${pushX}px, ${pushY}px) scale(0.95)`;
        } else {
          imgRef.current.style.transform = `translate(0px, 0px) scale(1)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchstart', handleMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchstart', handleMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className={parentClassName}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}

        className={`w-full h-full object-contain transition-transform duration-500 ease-out select-none pointer-events-none will-change-transform ${imgClassName}`}
      />
    </div>
  );
};

export default function OceanBackground() {
  const interactiveLightRef = useRef(null);
  const lightRequestRef = useRef();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleLightMove = (e) => {
      if (lightRequestRef.current) cancelAnimationFrame(lightRequestRef.current);

      lightRequestRef.current = requestAnimationFrame(() => {
        if (!interactiveLightRef.current) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        
        interactiveLightRef.current.style.background = `radial-gradient(circle 600px at ${x}px ${y}px, rgba(56, 189, 248, 0.12), transparent 80%)`;
      });
    };

    window.addEventListener('mousemove', handleLightMove);
    window.addEventListener('touchmove', handleLightMove, { passive: true });
    window.addEventListener('touchstart', handleLightMove, { passive: true });

    if (interactiveLightRef.current) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      interactiveLightRef.current.style.background = `radial-gradient(circle 600px at ${centerX}px ${centerY}px, rgba(56, 189, 248, 0.08), transparent 80%)`;
    }

    return () => {
      window.removeEventListener('mousemove', handleLightMove);
      window.removeEventListener('touchmove', handleLightMove);
      window.removeEventListener('touchstart', handleLightMove);
      if (lightRequestRef.current) cancelAnimationFrame(lightRequestRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes oceanSparkle {
          0% { background-position: 0% 0%; opacity: 0.3; }
          50% { background-position: 100% 100%; opacity: 0.6; }
          100% { background-position: 0% 0%; opacity: 0.3; }
        }
        .sparkle-layer {
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.04) 0%, transparent 4%),
            radial-gradient(circle at 70% 60%, rgba(56, 189, 248, 0.05) 0%, transparent 5%),
            radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 3%),
            radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.04) 0%, transparent 4%);
          background-size: 200px 200px;
          animation: oceanSparkle 12s infinite alternate ease-in-out;
          will-change: background-position, opacity;
        }

        /* Matikan semua animasi otomatis jika pengguna memiliki masalah sensitivitas gerakan */
        @media (prefers-reduced-motion: reduce) {
          .sparkle-layer, .b-visible, .i-fast, .i-med, .i-slow {
            animation: none !important;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#07101E]">
        
        <div className="absolute inset-0 z-[0] sparkle-layer mix-blend-screen pointer-events-none" />

        <div 
          ref={interactiveLightRef}
          className="absolute inset-0 z-[1] mix-blend-screen pointer-events-none transition-opacity duration-300 will-change-background"
        />

        {/* Cahaya Ambient Statis */}
        <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-[#38BDF8]/10 via-[#7CA1D3]/5 to-transparent mix-blend-screen pointer-events-none" />

        {/* Gelembung */}
        <DodgeElement src={circleSvg} parentClassName="absolute left-[5%] -bottom-16 w-3 opacity-30 b-visible" imgClassName="mix-blend-screen" alt="" />
        <DodgeElement src={circleSvg} parentClassName="absolute left-[15%] -bottom-16 w-5 opacity-20 blur-[1px] b-visible b-delay-2" imgClassName="mix-blend-screen" alt="" />
        <DodgeElement src={circleSvg} parentClassName="absolute left-[35%] -bottom-16 w-2 opacity-40 b-visible b-delay-1" imgClassName="mix-blend-screen" alt="" />
        <DodgeElement src={circleSvg} parentClassName="absolute left-[50%] -bottom-16 w-6 opacity-20 blur-[2px] b-visible b-delay-3" imgClassName="mix-blend-screen" alt="" />
        <DodgeElement src={circleSvg} parentClassName="absolute left-[60%] -bottom-16 w-4 opacity-30 b-visible" imgClassName="mix-blend-screen" alt="" />
        <DodgeElement src={circleSvg} parentClassName="absolute left-[80%] -bottom-16 w-5 opacity-20 blur-[1px] b-visible b-delay-2" imgClassName="mix-blend-screen" alt="" />
        <DodgeElement src={circleSvg} parentClassName="absolute left-[92%] -bottom-16 w-3 opacity-30 b-visible b-delay-1" imgClassName="mix-blend-screen" alt="" />
        <DodgeElement src={circleSvg} parentClassName="absolute left-[20%] -bottom-16 w-4 opacity-20 b-visible b-delay-3 delay-[8s]" imgClassName="mix-blend-screen" alt="" />

        {/* Ikan */}
        <DodgeElement src={ikanKecil} parentClassName="absolute top-[25%] w-8 opacity-30 i-fast" imgClassName="mix-blend-plus-lighter" alt="" />
        <DodgeElement src={ikanKecil} parentClassName="absolute top-[55%] w-8 opacity-20 i-med" imgClassName="mix-blend-plus-lighter" alt="" />
        <DodgeElement src={ikanKecil} parentClassName="absolute top-[85%] w-6 opacity-15 i-slow" imgClassName="mix-blend-plus-lighter" alt="" />

      </div>
    </>
  );
}