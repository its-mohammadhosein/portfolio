import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { BackToTop } from '@/components/ScrollToTop'
import { TitleMarkup, titleLines } from '@/components/TitleMarkup'
import { FlipButton } from '@/components/ui/flip-button'
import { getLinkHref } from '@/utilities/getLinkHref'

/**
 * html base footer (Elementor template 123): black; CTA / socials / back-to-top row, the giant
 * wordmark, then the credit line and links. Stacks and centres on mobile.
 */
export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const settings = await getCachedGlobal('site-settings', 0)()

  const navItems = footerData?.navItems || []
  const { cta, credit, showSocials, wordmark } = footerData
  const ctaHref = cta?.enableLink && cta.link ? getLinkHref(cta.link) : null
  const socials = showSocials ? (settings.socials ?? []) : []

  return (
    <footer className="mt-auto bg-ink text-paper max-md:py-8">
      <div className="flex flex-col p-8 max-md:items-center md:flex-row">
        <div className="flex flex-col items-start max-md:mb-5 max-md:items-center md:w-1/3">
          {cta?.eyebrow && <p className="type-eyebrow">{cta.eyebrow}</p>}
          {ctaHref && cta?.link?.label && (
            <FlipButton
              className="mt-2"
              href={ctaHref}
              label={cta.link.label}
              {...(cta.link.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
            />
          )}
        </div>

        <ul className="flex flex-col items-center gap-2 md:w-1/3">
          {socials.map((social, i) => (
            <li key={social.id ?? i}>
              <FlipButton
                href={social.url}
                label={social.label || social.platform}
                rel="noopener noreferrer"
                target="_blank"
                variant="plain"
              />
            </li>
          ))}
        </ul>

        <div className="flex justify-end max-md:mt-5 max-md:justify-center md:w-1/3">
          <BackToTop />
        </div>
      </div>

      {wordmark && (
        <p
          aria-label={titleLines(wordmark).join(' ').replace(/[*=]/g, '')}
          className="type-wordmark display-text my-12 flex flex-col items-center text-center min-[1025px]:mt-12 min-[1025px]:mb-16"
          data-anim="text-reveal"
        >
          <TitleMarkup lineClassName="block overflow-hidden" text={wordmark} />
        </p>
      )}

      <div className="flex flex-col p-8 font-sans text-base leading-[1.5] tracking-[-0.01em] min-[1025px]:flex-row">
        <div className="flex flex-wrap justify-center gap-x-5 min-[1025px]:w-1/2 min-[1025px]:justify-start">
          {credit && <p>{credit}</p>}
          <ThemeSelector />
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-col items-center gap-x-5 max-md:mt-5 md:flex-row md:flex-wrap md:justify-center min-[1025px]:w-1/2 min-[1025px]:justify-end"
        >
          {navItems.map(({ link }, i) => (
            <CMSLink className="text-paper min-[1025px]:pl-6" key={i} {...link} />
          ))}
        </nav>
      </div>
    </footer>
  )
}
