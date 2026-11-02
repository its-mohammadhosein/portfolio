// `pnpm seed:dyson` — seed the Dyson content into the database from DATABASE_URL.
import config from '@payload-config'
import { getPayload } from 'payload'

import { seedDyson } from './index'

const payload = await getPayload({ config })
await seedDyson({ payload })
process.exit(0)
