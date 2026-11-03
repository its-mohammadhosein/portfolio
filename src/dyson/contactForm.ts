import type { Payload, PayloadRequest } from 'payload'

/** The html base contact form (CF7 fields). Submissions are stored in Payload, no email (D3). */
export const contactFormData = {
  title: 'Contact',
  submitButtonLabel: 'Submit',
  confirmationType: 'message' as const,
  confirmationMessage: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Thank you for your message. I’ll get back to you soon.',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  },
  fields: [
    {
      blockType: 'text' as const,
      name: 'your-name',
      label: 'Your name',
      required: true,
      width: 100,
    },
    {
      blockType: 'email' as const,
      name: 'your-email',
      label: 'Your email',
      required: true,
      width: 100,
    },
    {
      blockType: 'text' as const,
      name: 'your-subject',
      label: 'Subject',
      required: true,
      width: 100,
    },
    {
      blockType: 'textarea' as const,
      name: 'your-message',
      label: 'Your message (optional)',
      required: false,
      width: 100,
    },
  ],
}

/**
 * Creates the "Contact" form if it doesn't exist (called on Payload init and by the seed), so the
 * fixed /contact page always has a working form. Returns its id.
 */
export const ensureContactForm = async (
  payload: Payload,
  req?: PayloadRequest,
  { update = false }: { update?: boolean } = {},
): Promise<number> => {
  const existing = await payload.find({
    collection: 'forms',
    limit: 1,
    pagination: false,
    req,
    where: { title: { equals: contactFormData.title } },
  })
  const found = existing.docs[0]
  if (found) {
    if (update) {
      await payload.update({
        collection: 'forms',
        context: { disableRevalidate: true },
        data: contactFormData,
        id: found.id,
        req,
      })
    }
    return found.id
  }
  const doc = await payload.create({
    collection: 'forms',
    context: { disableRevalidate: true },
    data: contactFormData,
    req,
  })
  return doc.id
}
