import { getSiteSettings } from '@/dyson/globals'
import type { ContactInfoBlock as ContactInfoBlockProps } from '@/payload-types'

import { SocialIcons } from '@/components/SocialIcons'
import React from 'react'

/** Bottom-border link that thickens on hover (`.link-border-dark a`: box-shadow 0 1px → 0 5px). */
const BorderLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    className="shadow-[0_1px_#000] transition-shadow duration-100 ease-linear hover:shadow-[0_5px_#000]"
    href={href}
  >
    {children}
  </a>
)

const contactText =
  'font-sans text-[1.2rem] leading-[1.45] font-semibold tracking-[-0.02em] md:text-[1.375rem]'

/**
 * Contact details (contact ed1136a): centred 35rem column — intro text (char animation), email,
 * phone and social icons from Site Settings — then the divider section (c5289c5).
 */
export const ContactInfoBlock: React.FC<ContactInfoBlockProps> = async ({
  animation,
  showEmail,
  showPhone,
  showSocials,
  text,
}) => {
  const settings = await getSiteSettings()
  const reveal = animation?.preset && animation.preset !== 'none'

  return (
    <>
      <div className="mx-auto flex max-w-[35rem] flex-col items-center px-6 py-20 text-center md:px-0 md:py-40">
        {text && (
          <p
            className={contactText}
            {...(reveal
              ? {
                  'data-anim': animation!.preset!,
                  'data-anim-text': '',
                  'data-anim-delay': String(animation?.delay ?? 0),
                  'data-anim-duration': String(animation?.duration ?? 0.75),
                  'data-anim-stagger': String(animation?.stagger ?? 0.02),
                }
              : {})}
          >
            {text}
          </p>
        )}
        {showEmail && settings.email && (
          <p className={`${contactText} mt-5`}>
            <BorderLink href={`mailto:${settings.email}`}>{settings.email}</BorderLink>
          </p>
        )}
        {showPhone && settings.phone && (
          <p className={`${contactText} mt-5`}>
            <BorderLink href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}>
              {settings.phone}
            </BorderLink>
          </p>
        )}
        {showSocials && <SocialIcons className="mt-8" socials={settings.socials} />}
      </div>
      <div className="px-gutter">
        <hr className="w-full border-0 border-t border-line" />
      </div>
    </>
  )
}
