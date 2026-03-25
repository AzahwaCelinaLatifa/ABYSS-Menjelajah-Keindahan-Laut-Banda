import { useEffect, useState } from 'react'

export function useIsMobileRaf(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )

  useEffect(() => {
    let frameId = 0

    const update = () => {
      frameId = 0
      const next = window.innerWidth < breakpoint
      setIsMobile((prev) => (prev === next ? prev : next))
    }

    const onResize = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(update)
    }

    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [breakpoint])

  return isMobile
}

export function useScreenTierRaf() {
  const [screenSize, setScreenSize] = useState(() => {
    if (typeof window === 'undefined') return 'desktop'
    const width = window.innerWidth
    if (width < 640) return 'mobile'
    if (width < 768) return 'tablet'
    return 'desktop'
  })

  useEffect(() => {
    let frameId = 0

    const update = () => {
      frameId = 0
      const width = window.innerWidth
      const next = width < 640 ? 'mobile' : width < 768 ? 'tablet' : 'desktop'
      setScreenSize((prev) => (prev === next ? prev : next))
    }

    const onResize = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(update)
    }

    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return screenSize
}
