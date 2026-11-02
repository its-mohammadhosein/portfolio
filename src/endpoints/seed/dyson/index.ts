import type { SeedArgs } from './helpers'

import { seedGlobals } from './globals'

/**
 * Dyson content from the html base (migration/content). Upserts by slug / filename, so it is safe
 * to re-run and does not touch other content. Runs next to the template seed, not instead of it.
 */
export const seedDyson = async (args: SeedArgs) => {
  args.payload.logger.info('Seeding Dyson content...')
  await seedGlobals(args)
  args.payload.logger.info('Dyson content seeded.')
}
