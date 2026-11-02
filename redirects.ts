import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // The html base has no /projects index; the project list lives on /work
  const projectsIndexRedirect = {
    destination: '/work',
    permanent: true,
    source: '/projects',
  }

  // Old WordPress shortlinks from the html base (index.html?p=N)
  const shortlinks: Record<string, string> = {
    '9': '/work',
    '13': '/contact',
    '15': '/about',
    '17': '/projects/visual-symphony',
    '32': '/projects/medium-scene',
    '47': '/projects/pixel-playground',
    '62': '/projects/the-first-brand',
    '78': '/projects/beyond-the-screen',
    '92': '/projects/reimagining-reality',
  }
  const shortlinkRedirects = Object.entries(shortlinks).map(([id, destination]) => ({
    destination,
    has: [{ type: 'query' as const, key: 'p', value: id }],
    permanent: true,
    source: '/',
  }))

  return [internetExplorerRedirect, projectsIndexRedirect, ...shortlinkRedirects]
}
