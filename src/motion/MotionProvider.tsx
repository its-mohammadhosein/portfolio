'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import { startMotion as startNative } from './engine'

/**
 * Starts the motion engine after each route change (client navigation swaps the page content).
 * GSAP (ScrollSmoother, ScrollTrigger, SplitText) is loaded on demand; if it fails to load, the
 * native engine runs the same `data-anim` markup.
 */
export const MotionProvider: React.FC<{ children?: React.ReactNode; smooth?: boolean }> = ({
  children,
  smooth = true,
}) => {
  const pathname = usePathname()

  useEffect(() => {
    let stop = () => {}
    let cancelled = false
    import('./engine-gsap')
      .then(({ startMotion }) => {
        if (!cancelled) stop = startMotion({ smooth })
      })
      .catch((error) => {
        // Only reached if GSAP fails to load or start; keep the page animated with the native engine
        console.error('[motion] GSAP engine failed, falling back to the native engine', error)
        if (!cancelled) stop = startNative()
      })
    return () => {
      cancelled = true
      stop()
    }
  }, [pathname, smooth])

  return <>{children}</>
}
