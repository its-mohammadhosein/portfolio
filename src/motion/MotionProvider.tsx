'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import { startMotion } from './engine'

/** Starts the motion engine after each route change (client navigation swaps the page content). */
export const MotionProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()

  useEffect(() => {
    let stop = () => {}
    // Wait a frame so the new route's DOM is in place
    const frame = requestAnimationFrame(() => {
      stop = startMotion()
    })
    return () => {
      cancelAnimationFrame(frame)
      stop()
    }
  }, [pathname])

  return <>{children}</>
}
