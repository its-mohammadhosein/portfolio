import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    // Expire now (not stale-while-revalidate) and refresh every page: it is in the layout of all of them
    revalidateTag('global_footer', { expire: 0 })
    revalidatePath('/', 'layout')
  }

  return doc
}
