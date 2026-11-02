import { cn } from '@/utilities/ui'
import React from 'react'

/** Blog / search page heading in the Dyson style (same scale as the WORK title). */
export const ArchiveHeading: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <h1
    className={cn(
      'display-text font-display text-[13vw] leading-[0.85] font-normal tracking-[-0.025em] uppercase md:text-[12vw] min-[1025px]:text-[10vw]',
      className,
    )}
    data-anim="text-reveal"
    data-anim-delay="0.15"
    data-anim-duration="0.7"
    data-anim-stagger="0.1"
    data-anim-text=""
  >
    {children}
  </h1>
)
