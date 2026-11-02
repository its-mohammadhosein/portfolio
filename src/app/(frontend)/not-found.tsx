import React from 'react'

import { Caption } from '@/components/ui/caption'
import { UnderlineLink } from '@/components/ui/underline-link'

/** 404 in the Dyson style: page-wide wordmark (as the WORK title), caption, underline link home. */
export default function NotFound() {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center gap-10 px-6 pt-[30vw] pb-[15vw] text-center md:pt-[15vw] md:pb-[11vw]">
      <h1 className="font-display text-[13vw] leading-[0.85] font-normal tracking-[-0.025em] uppercase md:text-[12vw] min-[1025px]:text-[16.87vw]">
        404
      </h1>
      <Caption as="p" size="lg">
        This page could not be found
      </Caption>
      <UnderlineLink href="/">Go home</UnderlineLink>
    </div>
  )
}
