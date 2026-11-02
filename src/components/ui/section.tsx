import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

/** Full-width page section; the html base alternates white and black sections. */
const sectionVariants = cva('relative w-full', {
  variants: {
    theme: {
      light: 'bg-paper text-copy',
      dark: 'bg-ink text-paper',
    },
  },
  defaultVariants: {
    theme: 'light',
  },
})

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {}

const Section: React.FC<SectionProps> = ({ className, theme, ...props }) => {
  return (
    <section
      data-slot="section"
      data-section-theme={theme ?? 'light'}
      className={cn(sectionVariants({ theme, className }))}
      {...props}
    />
  )
}

export { Section, sectionVariants }
