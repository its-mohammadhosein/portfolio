import { cn } from '@/utilities/ui'
import * as React from 'react'

const sizes = {
  xxl: 'type-display-xxl',
  xl: 'type-display-xl',
  l: 'type-display-l',
  m: 'type-display-m',
} as const

export interface DisplayTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  /** Kit display style; blocks override the size with the page CSS value (e.g. the 17vw hero) */
  size?: keyof typeof sizes
}

/**
 * Large display title. Supports `<em>` (nudged left like `.wcf--title em`) and `.highlight` children.
 */
const DisplayText: React.FC<DisplayTextProps> = ({
  as: Tag = 'h2',
  className,
  size = 'xl',
  ...props
}) => {
  return (
    <Tag
      data-slot="display-text"
      className={cn('display-text', sizes[size], className)}
      {...props}
    />
  )
}

export { DisplayText }
