import { cn } from '@/utilities/ui'
import * as React from 'react'

const sizes = {
  // table headers: "(Featured by)", "(Year)"
  sm: 'type-caption',
  // section labels: "(Scroll to explore)", "(SERVICES)"
  lg: 'type-heading',
} as const

export interface CaptionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'span' | 'p' | 'h2' | 'h3' | 'h4' | 'div'
  size?: keyof typeof sizes
  /** Wrap the text in parentheses, the html base's label motif */
  parens?: boolean
}

const Caption: React.FC<CaptionProps> = ({
  as: Tag = 'span',
  children,
  className,
  parens = true,
  size = 'sm',
  ...props
}) => {
  return (
    <Tag data-slot="caption" className={cn(sizes[size], className)} {...props}>
      {parens ? <>({children})</> : children}
    </Tag>
  )
}

export { Caption }
