import Script from 'next/script'
import React from 'react'

/**
 * Runs before paint: marks <html> as `motion-ready` so animated elements start hidden (no flash).
 * Skipped for reduced motion; without JS nothing is hidden. A failsafe reveals everything if the
 * engine hasn't started within 4s.
 */
export const InitMotion: React.FC = () => (
  // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
  <Script
    dangerouslySetInnerHTML={{
      __html: `
  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var root = document.documentElement;
    root.classList.add('motion-ready');
    setTimeout(function () {
      if (!root.classList.contains('motion-started')) root.classList.remove('motion-ready');
    }, 4000);
  })();
  `,
    }}
    id="motion-script"
    strategy="beforeInteractive"
  />
)
