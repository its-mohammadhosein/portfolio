import type { SeedArgs } from './helpers'
import { seedContext, upsertMedia } from './helpers'

/** Header, Footer and Site Settings content from the html base (_header.json / _footer.json). */
export const seedGlobals = async (args: SeedArgs) => {
  const { payload, req } = args
  const logo = await upsertMedia(args, 'logo.svg', 'Ricky Dyson')

  await payload.updateGlobal({
    slug: 'site-settings',
    context: seedContext,
    req,
    data: {
      email: 'welcome@rckydayson.com',
      phone: '+1 837 652 8800',
      socials: [
        { platform: 'facebook', label: 'Facebook', url: '#' },
        { platform: 'instagram', label: 'Instagram', url: '#' },
        { platform: 'x', label: 'X.com', url: '#' },
      ],
      smoothScroll: true,
      scrollToTop: true,
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    context: seedContext,
    req,
    data: {
      logo,
      availability: { enabled: true, text: 'Available May 2026' },
      navItems: [
        { link: { type: 'custom', url: '/', label: 'Home' } },
        { link: { type: 'custom', url: '/work', label: 'Work' } },
        { link: { type: 'custom', url: '/about', label: 'About' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    context: seedContext,
    req,
    data: {
      cta: {
        eyebrow: 'Have a project in mind?',
        enableLink: true,
        link: { type: 'custom', url: '/contact', label: "Let's Talk" },
      },
      showSocials: true,
      wordmark: 'R*i*cky\nDyson',
      credit: 'Designed by Treethemes.',
      navItems: [
        { link: { type: 'custom', url: '#', label: 'Instructions' } },
        { link: { type: 'custom', url: '#', label: 'Style Guide' } },
        { link: { type: 'custom', url: '#', label: 'Licenses' } },
        { link: { type: 'custom', url: '#', label: 'Changelog' } },
      ],
    },
  })

  payload.logger.info('— Dyson globals seeded')
}
