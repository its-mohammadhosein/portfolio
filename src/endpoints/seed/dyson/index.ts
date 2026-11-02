import type { SeedArgs } from './helpers'

import { seedGlobals } from './globals'
import { seedHome } from './pages/home'
import { seedProjects } from './projects'

/**
 * Dyson content from the html base (migration/content). Upserts by slug / filename, so it is safe
 * to re-run and does not touch other content. Runs next to the template seed, not instead of it.
 */
export const seedDyson = async (args: SeedArgs) => {
  args.payload.logger.info('Seeding Dyson content...')
  await seedGlobals(args)
  const projectIds = await seedProjects(args)
  await seedHome(args, projectIds)
  args.payload.logger.info('Dyson content seeded.')
}
