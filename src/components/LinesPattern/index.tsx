import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * Decorative vertical grid lines over the whole page (theme lines-pattern.js + master.min.css):
 * five columns with a 1px white right border, difference-blended at 10% (5% and four columns
 * at ≤991px).
 */
export const LinesPattern: React.FC = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-[1] flex w-full opacity-10 mix-blend-difference max-[991px]:opacity-5"
  >
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        className={cn(
          'flex-1 border-r border-white max-[991px]:w-1/4',
          i === 4 && 'max-[991px]:hidden',
        )}
        key={i}
      />
    ))}
  </div>
)
