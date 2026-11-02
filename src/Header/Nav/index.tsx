'use client'

import React, { useEffect, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { getLinkHref } from '@/utilities/getLinkHref'
import { cn } from '@/utilities/ui'
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/** Nav label that rolls up to a copy of itself on hover (bb-wcf-hover-brandberry). */
const RollLink: React.FC<{
  href: string
  label: string
  newTab?: boolean | null
  className?: string
}> = ({ href, label, newTab, className }) => (
  <Link
    className={cn('group relative block overflow-hidden', className)}
    href={href}
    {...(newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
  >
    <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.8,0,0.2,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none">
      {label}
    </span>
    <span
      aria-hidden
      className="absolute top-full left-0 block transition-transform duration-[450ms] ease-[cubic-bezier(0.8,0,0.2,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none"
    >
      {label}
    </span>
  </Link>
)

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = (data?.navItems || [])
    .map(({ link }) => ({ href: getLinkHref(link), label: link.label, newTab: link.newTab }))
    .filter((item): item is { href: string; label: string; newTab: boolean | null | undefined } =>
      Boolean(item.href && item.label),
    )

  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close the drawer when the route changes
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  // Esc closes; lock page scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [open])

  return (
    <nav
      aria-label="Main"
      className="flex w-1/2 items-center justify-end py-5 md:w-[68%] min-[1025px]:w-1/2"
    >
      {/* Desktop (>1024px) */}
      <ul className="hidden items-center gap-[30px] min-[1025px]:flex">
        {navItems.map((item, i) => (
          <li className="type-nav" key={i}>
            <RollLink {...item} />
          </li>
        ))}
        <li>
          <Link className="flex" href="/search">
            <span className="sr-only">Search</span>
            <SearchIcon aria-hidden className="size-5" />
          </Link>
        </li>
      </ul>

      {/* Mobile / tablet (≤1024px): hamburger + left drawer */}
      <button
        aria-controls="mobile-menu"
        aria-expanded={open}
        className="flex items-center text-[25px] min-[1025px]:hidden"
        onClick={() => setOpen(true)}
        type="button"
      >
        <span className="sr-only">Open menu</span>
        <MenuIcon aria-hidden className="size-[1em]" />
      </button>

      <div
        aria-hidden
        className={cn(
          'fixed inset-0 z-[1000] bg-black/50 transition-opacity duration-[400ms] min-[1025px]:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
      />
      <div
        aria-label="Menu"
        aria-modal="true"
        className={cn(
          'fixed top-0 bottom-0 left-0 z-[1001] flex h-dvh w-[60%] flex-col overflow-y-auto bg-ink text-paper transition-[transform,opacity,visibility] duration-[450ms] md:w-[250px] min-[1025px]:hidden',
          open ? 'visible translate-x-0 opacity-100' : 'invisible -translate-x-full opacity-0',
        )}
        id="mobile-menu"
        role="dialog"
      >
        <button
          className="m-[10px] ml-auto flex min-h-10 min-w-10 items-center justify-center self-end rounded-full border border-[#555] text-[20px]"
          onClick={() => setOpen(false)}
          type="button"
        >
          <span className="sr-only">Close menu</span>
          <XIcon aria-hidden className="size-[1em]" />
        </button>
        <ul className="flex flex-col">
          {[...navItems, { href: '/search', label: 'Search', newTab: false }].map((item, i) => (
            <li
              className="font-display text-[1.35rem] leading-[1.15] font-semibold tracking-[-0.02px] md:text-[1.25rem] md:leading-[1.5] md:tracking-[-0.01em]"
              key={i}
            >
              <RollLink {...item} className="pt-[15px] pl-[20px] md:pt-0" />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
