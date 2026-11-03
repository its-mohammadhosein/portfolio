import type { Footer, Header, SiteSetting } from '@/payload-types'

import { getCachedGlobal } from '@/utilities/getGlobals'

import { defaults, mediaOr } from './defaults'

const filled = (value: unknown) =>
  Array.isArray(value) ? value.length > 0 : value !== null && value !== undefined && value !== ''

/** Header with the html base logo / badge / nav where Payload has nothing (or a deleted logo). */
export const withHeaderDefaults = (header: Header): Header => ({
  ...header,
  logo: mediaOr(header.logo, defaults.header.logo),
  availability: {
    enabled: header.availability?.enabled ?? defaults.header.availability.enabled,
    text: filled(header.availability?.text)
      ? header.availability?.text
      : defaults.header.availability.text,
  },
  navItems: filled(header.navItems) ? header.navItems : defaults.header.navItems,
})

/** Footer with the html base CTA / wordmark / credit / links where Payload has nothing. */
export const withFooterDefaults = (footer: Footer): Footer => {
  const ctaSet = filled(footer.cta?.eyebrow) || Boolean(footer.cta?.enableLink)
  return {
    ...footer,
    cta: ctaSet ? footer.cta : defaults.footer.cta,
    wordmark: filled(footer.wordmark) ? footer.wordmark : defaults.footer.wordmark,
    credit: filled(footer.credit) ? footer.credit : defaults.footer.credit,
    navItems: filled(footer.navItems) ? footer.navItems : defaults.footer.navItems,
  }
}

/** Site Settings with the html base contact details and socials where Payload has nothing. */
export const withSiteSettingsDefaults = (settings: SiteSetting): SiteSetting => ({
  ...settings,
  email: filled(settings.email) ? settings.email : defaults.siteSettings.email,
  phone: filled(settings.phone) ? settings.phone : defaults.siteSettings.phone,
  socials: filled(settings.socials) ? settings.socials : defaults.siteSettings.socials,
  smoothScroll: settings.smoothScroll ?? defaults.siteSettings.smoothScroll,
  scrollToTop: settings.scrollToTop ?? defaults.siteSettings.scrollToTop,
})

export const getSiteSettings = async () =>
  withSiteSettingsDefaults(await getCachedGlobal('site-settings', 0)())
