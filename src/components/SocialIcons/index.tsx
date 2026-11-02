import type { SiteSetting } from '@/payload-types'

import { cn } from '@/utilities/ui'
import {
  DribbbleIcon,
  FacebookIcon,
  GithubIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
} from 'lucide-react'
import React from 'react'

type Social = NonNullable<SiteSetting['socials']>[number]

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z" />
  </svg>
)

const icons: Record<Social['platform'], React.FC<React.SVGProps<SVGSVGElement>>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  x: XIcon,
  linkedin: LinkedinIcon,
  dribbble: DribbbleIcon,
  behance: GlobeIcon,
  github: GithubIcon,
  other: GlobeIcon,
}

/** Round icon links (home hero wcf--social-icons 34fbf40): 18px icon, 9px padding, 4px gap. */
export const SocialIcons: React.FC<{ socials?: Social[] | null; className?: string }> = ({
  socials,
  className,
}) => {
  if (!socials?.length) return null
  return (
    <ul className={cn('flex flex-row gap-[4px]', className)}>
      {socials.map((social, i) => {
        const Icon = icons[social.platform] ?? GlobeIcon
        return (
          <li key={social.id ?? i}>
            <a
              aria-label={social.label || social.platform}
              className="flex size-[36px] items-center justify-center rounded-full bg-ink text-paper transition-opacity hover:opacity-80"
              href={social.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon aria-hidden className="size-[18px]" strokeWidth={1.8} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
