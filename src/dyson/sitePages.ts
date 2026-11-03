/** Fixed routes editors can link to with the "Site page" link type (no Payload document behind them). */
export const sitePages = [
  { label: 'Home', value: 'home', path: '/' },
  { label: 'Work', value: 'work', path: '/work' },
  { label: 'About', value: 'about', path: '/about' },
  { label: 'Contact', value: 'contact', path: '/contact' },
  { label: 'Posts (blog)', value: 'posts', path: '/posts' },
  { label: 'Search', value: 'search', path: '/search' },
] as const

export type SitePage = (typeof sitePages)[number]['value']

export const sitePagePath = (value?: string | null) =>
  sitePages.find((page) => page.value === value)?.path ?? null
