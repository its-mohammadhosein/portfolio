import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'
import * as React from 'react'

/** aae--advanced-button style-3: label that flips in 3D on hover. */
const flipButtonVariants = cva('flip-hover inline-flex items-center gap-[5px] transition-all', {
  variants: {
    variant: {
      // footer 31dbc52 "Let's Talk"
      pill: 'type-button rounded-pill border border-copy bg-paper px-[17px] py-[7px] text-ink',
      // footer 5ff3545 social links (no box)
      plain: 'type-button-lg text-current',
    },
  },
  defaultVariants: {
    variant: 'pill',
  },
})

type BaseProps = VariantProps<typeof flipButtonVariants> & {
  className?: string
  label: string
}

type FlipButtonProps =
  | (BaseProps & { href: string } & Omit<React.ComponentProps<typeof Link>, 'href' | 'children'>)
  | (BaseProps & { href?: undefined } & Omit<React.ComponentProps<'button'>, 'children'>)

const FlipButton: React.FC<FlipButtonProps> = ({ className, label, variant, ...props }) => {
  const classes = cn(flipButtonVariants({ variant, className }))
  // The hover copy comes from data-text (see the flip-hover utility)
  const content = <span data-text={label}>{label}</span>

  if (props.href !== undefined) {
    return (
      <Link data-slot="flip-button" className={classes} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <button
      data-slot="flip-button"
      className={classes}
      {...(props as React.ComponentProps<'button'>)}
    >
      {content}
    </button>
  )
}

export { FlipButton, flipButtonVariants }
