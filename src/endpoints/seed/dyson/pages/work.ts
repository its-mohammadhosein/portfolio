import type { SeedArgs } from '../helpers'
import { upsertBySlug } from '../helpers'

/** Work page (migration/content/work.json): title + all projects in a 2-column grid. */
export const seedWork = async (args: SeedArgs) => {
  await upsertBySlug(args, 'pages', 'work', {
    title: 'Work',
    slug: 'work',
    hero: { type: 'none' },
    _status: 'published',
    meta: { title: 'Work', description: 'Selected projects by Ricky Dyson.' },
    layout: [
      {
        blockType: 'pageTitle',
        title: 'WORK',
        size: 'xxl',
        align: 'center',
        animation: { preset: 'text-reveal', delay: 0.15, duration: 0.7, stagger: 0.1 },
      },
      {
        blockType: 'portfolioGrid',
        layout: 'grid',
        populateBy: 'latest',
        limit: 12,
        showTabs: false,
        animation: { preset: 'fade-up' },
      },
    ],
  })
  args.payload.logger.info('— Dyson work page seeded')
}
