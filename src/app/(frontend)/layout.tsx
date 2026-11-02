import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { Inter, Mona_Sans } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { InitMotion } from '@/motion/InitMotion'
import { MotionProvider } from '@/motion/MotionProvider'
import { LinesPattern } from '@/components/LinesPattern'
import { ScrollToTop } from '@/components/ScrollToTop'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// Display face (headings, nav, buttons). Italic is used by `<em>` in display titles, e.g. "R<em>i</em>cky"
const monaSans = Mona_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-mona-sans',
  display: 'swap',
})

// Body face
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const settings = await getCachedGlobal('site-settings', 0)()

  return (
    <html
      className={cn(monaSans.variable, inter.variable, GeistMono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <InitMotion />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <MotionProvider smooth={settings.smoothScroll ?? true}>
            {/* ScrollSmoother moves #smooth-content; fixed UI (scroll-to-top, mobile drawer via portal) stays outside */}
            <div id="smooth-wrapper">
              <div className="relative flex min-h-screen flex-col" id="smooth-content">
                <LinesPattern />
                <AdminBar
                  adminBarProps={{
                    preview: isEnabled,
                  }}
                />
                <Header />
                {children}
                <Footer />
              </div>
            </div>
            {settings.scrollToTop && <ScrollToTop />}
          </MotionProvider>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
