import type { Page } from '@/payload-types'

import type { SeedArgs } from '../helpers'
import { upsertMedia } from '../helpers'

type Block = Page['layout'][number]

/** "Benefits" section — identical on home (c9bb459) and about. */
export const benefitsBlock = (): Block => ({
  blockType: 'featureList',
  label: 'Benefits',
  pinned: true,
  theme: 'dark',
  items: [
    {
      icon: 'creativeExcellence',
      title: 'Creative Excellence',
      text: 'We combine imagination with expertise to craft bold and innovative ideas that elevate your brand’s identity and make a lasting impression.',
    },
    {
      icon: 'professionalTeam',
      title: 'Professional Team',
      text: 'Our dedicated team of designers, developers, and strategists bring years of experience and a passion for excellence to deliver outstanding results.',
    },
    {
      icon: 'collaborativeApproach',
      title: 'Collaborative Approach',
      text: 'Your input is invaluable. We work closely with you, maintaining open communication and refining ideas to ensure the final product exceeds expectations.',
    },
    {
      icon: 'onTimeDelivery',
      title: 'On-Time Delivery',
      text: 'We respect your deadlines and commit to delivering high-quality work on schedule, ensuring your project’s success without compromise.',
    },
  ],
  animation: { preset: 'fade-up' },
})

/** "Reaching New Heights" over the background video — identical on home (384efc1) and about. */
export const reachingBlock = async (args: SeedArgs): Promise<Block> => ({
  blockType: 'statement',
  title: 'Reaching\nNew Heights',
  titleSize: 'large',
  align: 'bottomLeft',
  text: 'Each project is a chance to explore new possibilities, challenge conventions, and design experiences that resonate deeply. For me, reaching new heights means constantly evolving brands do the same through design.',
  backgroundMedia: await upsertMedia(args, 'video2.mp4', 'Reaching new heights video'),
  overlayOpacity: 0.25,
  enableLink: true,
  link: { type: 'custom', url: '/about', label: 'More about me', appearance: 'underline' },
  theme: 'dark',
  animation: { preset: 'text-reveal', delay: 0.15, duration: 0.7, stagger: 0.1 },
})
