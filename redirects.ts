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

  return [internetExplorerRedirect, projectsIndexRedirect]
}
