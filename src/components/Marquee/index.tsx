import { cn } from '@/utilities/ui'
import React from 'react'

const REPEAT = 6

/**
 * Infinite scrolling word strip (wcf--brand-slider: Swiper loop, `speed` ms per slide, autoplay
 * delay 1). Two identical halves translate by -50% so the loop is seamless; pauses for reduced motion.
 */
export const Marquee: React.FC<{
  text: string
  /** ms for one item to pass, as the Swiper `speed` setting */
  speed?: number | null
  /** px between items (Swiper spaceBetween) */
  gap?: number | null
  reverse?: boolean | null
  className?: string
  itemClassName?: string
}> = ({ text, speed = 5000, gap = 50, reverse, className, itemClassName }) => {
  const items = Array.from({ length: REPEAT }, (_, i) => i)
  const half = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
      style={{ gap: `var(--marquee-gap)`, paddingRight: `var(--marquee-gap)` }}
    >
      {items.map((i) => (
        <span className={cn('shrink-0 whitespace-nowrap', itemClassName)} key={i}>
          {text}
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={cn('flex overflow-hidden', className)}
      style={
        {
          '--marquee-gap': `${gap ?? 50}px`,
          '--marquee-duration': `${((speed ?? 5000) * REPEAT) / 1000}s`,
        } as React.CSSProperties
      }
    >
      <span className="sr-only">{text}</span>
      <div className={cn('animate-marquee flex w-max', reverse && '[animation-direction:reverse]')}>
        {half(true)}
        {half(true)}
      </div>
    </div>
  )
}
