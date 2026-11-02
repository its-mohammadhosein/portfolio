'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

/**
 * html base header (Elementor template 128): absolute overlay, logo + availability badge on the
 * left, nav on the right; hamburger drawer at ≤1024px. Fades in on load (delay 0.15s).
 */
export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Keep the last non-null header theme (adjusting state during render instead of in an effect)
  if (headerTheme && headerTheme !== theme) setTheme(headerTheme)

  const { availability, logo } = data
  const hasLogo = logo && typeof logo === 'object'

  return (
    <header
      className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-[15px] text-ink data-[theme=dark]:text-paper max-md:justify-center md:px-gutter md:py-5"
      data-anim="fade"
      data-anim-delay="0.15"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="flex w-1/2 items-center md:w-[85%] min-[1025px]:w-[35%]">
        <Link aria-label="Home" className="shrink-0" href="/">
          {hasLogo ? (
            <Media
              imgClassName="w-[80px] h-auto md:w-[90px] in-data-[theme=dark]:invert"
              priority
              resource={logo}
              size="90px"
            />
          ) : (
            <Logo className="invert dark:invert-0" loading="eager" priority="high" />
          )}
        </Link>
        {availability?.enabled && availability.text && (
          <p className="type-nav ml-4 hidden items-center gap-[15px] pl-[15px] md:flex">
            <span aria-hidden className="size-[14px] shrink-0 rounded-full bg-current" />
            {availability.text}
          </p>
        )}
      </div>
      <HeaderNav data={data} />
    </header>
  )
}
