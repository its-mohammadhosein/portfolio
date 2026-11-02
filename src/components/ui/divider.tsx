import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

/** Elementor divider: 1px solid rule (awards/experience tables use #000). */
const dividerVariants = cva('w-full border-0 border-t', {
  variants: {
    tone: {
      ink: 'border-ink',
      paper: 'border-paper',
      line: 'border-line',
    },
  },
  defaultVariants: {
    tone: 'ink',
  },
})

export interface DividerProps
  extends React.HTMLAttributes<HTMLHRElement>, VariantProps<typeof dividerVariants> {}

const Divider: React.FC<DividerProps> = ({ className, tone, ...props }) => {
  return <hr data-slot="divider" className={cn(dividerVariants({ tone, className }))} {...props} />
}

export { Divider, dividerVariants }
