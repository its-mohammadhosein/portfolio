import { Button, type ButtonProps } from '@/components/ui/button'
import { FlipButton } from '@/components/ui/flip-button'
import { UnderlineLink } from '@/components/ui/underline-link'
import { getLinkHref } from '@/utilities/getLinkHref'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post, Project } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | 'pill' | 'underline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'projects'
    value: Page | Post | Project | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | 'page' | null
  page?: string | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    page,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href = getLinkHref({ type, url, reference, page })

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  if (appearance === 'pill') {
    return <FlipButton className={className} href={href} label={label || ''} {...newTabProps} />
  }

  if (appearance === 'underline') {
    return (
      <UnderlineLink className={className} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </UnderlineLink>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
