import { useMemo, useSyncExternalStore } from 'react'

const DEFAULT_WIDTH = 1024

const getWidth = () => (typeof window !== 'undefined' ? window.innerWidth : DEFAULT_WIDTH)

let widthSnapshot = getWidth()
let resizeFrame = 0
let isListening = false
const subscribers = new Set()

const notifyIfNeeded = () => {
  const next = getWidth()
  if (next === widthSnapshot) return
  widthSnapshot = next
  subscribers.forEach((cb) => cb())
}

const onResize = () => {
  if (resizeFrame) return
  resizeFrame = window.requestAnimationFrame(() => {
    resizeFrame = 0
    notifyIfNeeded()
  })
}

const startListening = () => {
  if (isListening || typeof window === 'undefined') return
  isListening = true
  widthSnapshot = getWidth()
  window.addEventListener('resize', onResize)
}

const stopListening = () => {
  if (!isListening || typeof window === 'undefined') return
  isListening = false
  window.removeEventListener('resize', onResize)
  if (resizeFrame) {
    window.cancelAnimationFrame(resizeFrame)
    resizeFrame = 0
  }
}

const subscribeWidth = (callback) => {
  subscribers.add(callback)
  startListening()
  return () => {
    subscribers.delete(callback)
    if (subscribers.size === 0) stopListening()
  }
}

const getClientSnapshot = () => widthSnapshot
const getServerSnapshot = () => DEFAULT_WIDTH

function useViewportWidth() {
  return useSyncExternalStore(subscribeWidth, getClientSnapshot, getServerSnapshot)
}

export function useIsMobileRaf(breakpoint = 768) {
  const width = useViewportWidth()
  return useMemo(() => width < breakpoint, [width, breakpoint])
}

export function useScreenTierRaf() {
  const width = useViewportWidth()
  return useMemo(() => {
    if (width < 640) return 'mobile'
    if (width < 768) return 'tablet'
    return 'desktop'
  }, [width])
}
