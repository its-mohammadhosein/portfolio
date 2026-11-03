import { createLocalReq, getPayload } from 'payload'
import { seedDyson } from '@/endpoints/seed/dyson'
import config from '@payload-config'
import { revalidatePath, revalidateTag } from 'next/cache'
import { headers } from 'next/headers'

// Uploads ~30 images/videos (resized by sharp), so allow the full Vercel function duration
export const maxDuration = 300

/**
 * Seeds the Dyson content (html base) into the current database — for production, where
 * `pnpm seed:dyson` can't run. Logged-in users only. Upserts, so it is safe to run again.
 */
export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    const payloadReq = await createLocalReq({ user }, payload)

    await seedDyson({ payload, req: payloadReq })

    // The seed writes with revalidation off; refresh every cached page and query now
    for (const tag of [
      'global_header',
      'global_footer',
      'global_site-settings',
      'global_home-page',
      'global_work-page',
      'global_about-page',
      'global_contact-page',
      'projects',
      'projects-sitemap',
      'pages-sitemap',
    ]) {
      revalidateTag(tag, 'max')
    }
    revalidatePath('/', 'layout')

    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding Dyson content' })
    return new Response('Error seeding Dyson content.', { status: 500 })
  }
}
