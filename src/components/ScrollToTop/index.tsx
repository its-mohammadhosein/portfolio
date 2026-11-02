'use client'

import { cn } from '@/utilities/ui'
import { ArrowUpIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const scrollToTop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

const RADIUS = 21
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * Floating button (wcf-scroll-to-top, kit post-119): 46px black circle, 15px from the corner, with a
 * ring showing scroll progress; appears after scrolling (opacity + 15px rise, 0.2s linear).
 */
export const ScrollToTop: React.FC = () => {
  const [state, setState] = useState({ visible: false, progress: 0 })

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setState({
        visible: window.scrollY > 200,
        progress: max > 0 ? Math.min(1, window.scrollY / max) : 0,
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <button
      aria-label="Scroll to top"
      className={cn(
        'fixed right-[15px] bottom-[15px] z-[9999] flex size-[46px] items-center justify-center rounded-full bg-ink text-[18px] text-paper transition-[opacity,transform,visibility] duration-200 ease-linear',
        state.visible
          ? 'visible translate-y-0 opacity-100'
          : 'invisible translate-y-[15px] opacity-0',
      )}
      onClick={scrollToTop}
      type="button"
    >
      <svg aria-hidden className="absolute inset-0 size-full -rotate-90" viewBox="0 0 46 46">
        <circle
          cx="23"
          cy="23"
          fill="none"
          r={RADIUS}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <circle
          cx="23"
          cy="23"
          fill="none"
          r={RADIUS}
          stroke="currentColor"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - state.progress)}
          strokeWidth="2"
        />
      </svg>
      <ArrowUpIcon aria-hidden className="size-[1em]" />
    </button>
  )
}

/** Footer "Back to top" link (footer e9a74ca): icon before the text, Mona Sans 500 1.125rem. */
export const BackToTop: React.FC<{ className?: string }> = ({ className }) => (
  <button
    className={cn('type-button-lg flip-hover inline-flex items-center gap-[10px]', className)}
    onClick={scrollToTop}
    type="button"
  >
    <ArrowUpIcon aria-hidden className="size-[25px]" />
    <span data-text="Back to top">Back to top</span>
  </button>
)
