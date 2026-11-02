import { cn } from '@/utilities/ui'
import * as React from 'react'

/** Site container: max 1350px with 30px side padding (Elementor kit post-119). */
const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div
      data-slot="container"
      className={cn('mx-auto w-full max-w-site px-gutter', className)}
      {...props}
    />
  )
}

export { Container }
