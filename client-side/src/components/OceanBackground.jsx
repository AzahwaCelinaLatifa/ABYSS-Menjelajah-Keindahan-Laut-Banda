import React, { memo, useEffect, useRef } from 'react';
import circleSvg from '../assets/circle.webp';
import ikanKecil from '../assets/ikan kecil.webp';

let pointerFrame = 0;
let pointerListening = false;
let pointerLastX = null;
let pointerLastY = null;
const pointerSubscribers = new Set();

const emitPointer = () => {
  pointerFrame = 0;
  if (pointerLastX === null || pointerLastY === null) return;
  pointerSubscribers.forEach((cb) => cb(pointerLastX, pointerLastY));
};

const schedulePointerEmit = (x, y) => {
  pointerLastX = x;
  pointerLastY = y;
  if (pointerFrame) return;
  pointerFrame = window.requestAnimationFrame(emitPointer);
};

const handlePointerMove = (e) => {
  schedulePointerEmit(e.clientX, e.clientY);
};

const handlePointerDown = (e) => {
  schedulePointerEmit(e.clientX, e.clientY);
};

const startPointerListener = () => {
  if (pointerListening || typeof window === 'undefined') return;
  pointerListening = true;
  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('pointerdown', handlePointerDown, { passive: true });
};

const stopPointerListener = () => {
  if (!pointerListening || typeof window === 'undefined') return;
  pointerListening = false;
  window.removeEventListener('pointermove', handlePointerMove);
  window.removeEventListener('pointerdown', handlePointerDown);
  if (pointerFrame) {
    window.cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
  }
};

const subscribePointer = (callback) => {
  pointerSubscribers.add(callback);
  startPointerListener();
  return () => {
    pointerSubscribers.delete(callback);
    if (pointerSubscribers.size === 0) {
      stopPointerListener();
    }
  };
};

const DodgeElement = memo(function DodgeElement({ src, parentClassName, imgClassName, alt }) {
  const imgRef = useRef(null);
  const isDodgingRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const unsubscribe = subscribePointer((clientX, clientY) => {
      if (!imgRef.current) return;
      
      const rect = imgRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const dx = clientX - x;
      const dy = clientY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const interactionRadius = 120; 

      if (distance < interactionRadius) {
        const force = (interactionRadius - distance) / interactionRadius;
        const safeDistance = Math.max(distance, 1);
        const pushX = -(dx / safeDistance) * force * 50; 
        const pushY = -(dy / safeDistance) * force * 50;
        
        imgRef.current.style.transform = `translate(${pushX}px, ${pushY}px) scale(0.95)`;
        isDodgingRef.current = true;
      } else {
        if (isDodgingRef.current) {
          imgRef.current.style.transform = '';
          isDodgingRef.current = false;
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={parentClassName}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-contain transition-transform duration-500 ease-out select-none pointer-events-none ${imgClassName}`}
      />
    </div>
  );
});

function OceanBackground() {
  const interactiveLightRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const unsubscribe = subscribePointer((x, y) => {
      if (!interactiveLightRef.current) return;
      interactiveLightRef.current.style.background = `radial-gradient(circle 600px at ${x}px ${y}px, rgba(56, 189, 248, 0.12), transparent 80%)`;
    });

    if (interactiveLightRef.current) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      interactiveLightRef.current.style.background = `radial-gradient(circle 600px at ${centerX}px ${centerY}px, rgba(56, 189, 248, 0.08), transparent 80%)`;
    }

    return () => {
      unsubscribe();
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

        /* * FIX IKAN: Memaksa jalan secara otomatis saat web dibuka!
         * Menggunakan nilai negatif agar letaknya menyebar dan tidak saling menunggu. 
         */
        .i-fast { animation-play-state: running !important; animation-delay: -3s !important; }
        .i-med  { animation-play-state: running !important; animation-delay: -12s !important; }
        .i-slow { animation-play-state: running !important; animation-delay: -25s !important; }

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
        <DodgeElement src={circleSvg} parentClassName="absolute left-[35%] -bottom-16 w-2 opacity-40 b-visible b-delay-1" imgClassName="mix-blend-screen" alt="" />
        <DodgeElement src={circleSvg} parentClassName="absolute left-[60%] -bottom-16 w-4 opacity-30 b-visible" imgClassName="mix-blend-screen" alt="" />
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

export default memo(OceanBackground)