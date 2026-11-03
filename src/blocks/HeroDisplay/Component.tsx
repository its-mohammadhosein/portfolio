import { getSiteSettings } from '@/dyson/globals'
import type { HeroDisplayBlock as HeroDisplayBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { SocialIcons } from '@/components/SocialIcons'
import { TitleMarkup, titleLines, titlePlainText } from '@/components/TitleMarkup'
import { Caption } from '@/components/ui/caption'
import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * Home / About hero (home 38b9b7a): full-height white section, rotated parallax image behind the
 * wordmark; the first line is light and white with `mix-blend-mode: difference` so it inverts over
 * the image; roles, socials and the "(Scroll to explore)" caption sit along the bottom.
 */
export const HeroDisplayBlock: React.FC<HeroDisplayBlockProps> = async ({
  animation,
  caption,
  image,
  imageSpeed,
  roles,
  showSocials,
  title,
}) => {
  const lines = titleLines(title)
  const settings = showSocials ? await getSiteSettings() : null
  const reveal = animation?.preset && animation.preset !== 'none'
  // html base: line delays 0.45 / 0.65, duration 0.7, stagger 0.1
  const lineAnim = (i: number) =>
    reveal
      ? {
          'data-anim': animation!.preset!,
          'data-anim-text': '',
          'data-anim-delay': String((animation?.delay ?? 0.45) + i * 0.2),
          'data-anim-duration': String(animation?.duration ?? 0.7),
          'data-anim-stagger': String(animation?.stagger ?? 0.1),
        }
      : {}
  const hasBottom = Boolean(roles?.length || caption || settings?.socials?.length)

  return (
    <div className="relative flex min-h-[85vh] flex-col justify-center md:min-h-[90vh] min-[1025px]:min-h-screen">
      <div className="relative flex flex-col gap-[10px] md:-mt-[1em]">
        {image && typeof image === 'object' && (
          <div className="absolute inset-x-0 top-0 flex justify-center -mt-[6em] md:-mt-[10em] min-[1025px]:-mt-[12em]">
            <div className="w-[30vw] rotate-[15deg] md:w-[24vw]" data-speed={imageSpeed ?? 1.5}>
              <Media imgClassName="h-auto w-full" priority resource={image} size="30vw" />
            </div>
          </div>
        )}
        <h1
          aria-label={titlePlainText(title)}
          className="relative flex flex-col items-center text-center"
        >
          {lines.map((line, i) => (
            <span
              className={cn(
                'block',
                i === 0 ? 'text-paper mix-blend-difference' : 'overflow-hidden max-md:-mt-[5px]',
              )}
              key={i}
            >
              <span
                aria-hidden
                className={cn(
                  'type-wordmark display-text block max-md:text-[21vw]',
                  i === 0 && 'font-light',
                )}
                {...lineAnim(i)}
              >
                <TitleMarkup asLines={false} text={line} />
              </span>
            </span>
          ))}
        </h1>
      </div>

      {hasBottom && (
        <div className="absolute inset-x-0 -bottom-4 flex flex-row flex-wrap items-center justify-center gap-5 px-8 max-md:mt-[3em] md:flex-nowrap md:justify-between">
          <SocialIcons socials={settings?.socials} />
          {roles && roles.length > 0 && (
            <ul className="flex flex-col items-center max-md:my-[25px] md:w-[33%]">
              {roles.map((role, i) => (
                <li
                  className="font-display text-[1.5rem] leading-[0.8] font-semibold text-ink md:text-[2.75vw]"
                  key={role.id ?? i}
                >
                  {role.text}
                </li>
              ))}
            </ul>
          )}
          {caption && (
            <Caption as="p" className="max-md:text-center md:text-end" size="lg">
              {caption}
            </Caption>
          )}
        </div>
      )}
    </div>
  )
}
