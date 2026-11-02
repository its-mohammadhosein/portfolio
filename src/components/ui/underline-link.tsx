import { cn } from '@/utilities/ui'
import Link from 'next/link'
import * as React from 'react'

/** wcf--button `.wcf-btn-underline`: text link whose 3px underline shrinks away on hover. */
const UnderlineLink: React.FC<React.ComponentProps<typeof Link>> = ({ className, ...props }) => {
  return (
    <Link
      data-slot="underline-link"
      className={cn('link-underline type-link inline-block text-current', className)}
      {...props}
    />
  )
}

export { UnderlineLink }
