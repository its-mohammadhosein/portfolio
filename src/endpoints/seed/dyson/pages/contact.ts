import type { SeedArgs } from '../helpers'
import { seedContext, upsertBySlug, upsertMedia } from '../helpers'

/** The contact form (CF7 fields in the html base): stored in Payload, no email (D3). */
const upsertContactForm = async ({ payload, req }: SeedArgs): Promise<number> => {
  const data = {
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
  const existing = await payload.find({
    collection: 'forms',
    limit: 1,
    pagination: false,
    req,
    where: { title: { equals: data.title } },
  })
  if (existing.docs[0]) {
    await payload.update({
      collection: 'forms',
      context: seedContext,
      data,
      id: existing.docs[0].id,
      req,
    })
    return existing.docs[0].id
  }
  const doc = await payload.create({ collection: 'forms', context: seedContext, data, req })
  return doc.id
}

/** Contact page (migration/content/contact.json). */
export const seedContact = async (args: SeedArgs) => {
  const image = await upsertMedia(args, '1.webp', 'Studio workspace')
  const form = await upsertContactForm(args)

  await upsertBySlug(args, 'pages', 'contact', {
    title: 'Contact',
    slug: 'contact',
    hero: { type: 'none' },
    _status: 'published',
    meta: { title: 'Contact', description: 'Have a question? Just drop me a line.' },
    layout: [
      {
        blockType: 'pageTitle',
        title: 'Let’s Talk',
        size: 'xxl',
        align: 'center',
        animation: { preset: 'text-reveal', delay: 0.15, duration: 0.7, stagger: 0.1 },
      },
      {
        blockType: 'mediaBlock',
        media: image,
        width: 'full',
        speed: 0.9,
        animation: { preset: 'fade-up' },
      },
      {
        blockType: 'contactInfo',
        text: 'Have a question? Just drop me a line via email or make a WhatsApp call. I am available for new projects and interesting opportunities.',
        showEmail: true,
        showPhone: true,
        showSocials: true,
        animation: { preset: 'chars', delay: 0, duration: 0.75, stagger: 0.02 },
      },
      {
        blockType: 'formBlock',
        title: 'I’d love to\nhear from you',
        form,
        enableIntro: false,
        animation: { preset: 'text-reveal', delay: 0.5, duration: 1, stagger: 0.02 },
      },
    ],
  })
  args.payload.logger.info('— Dyson contact page and form seeded')
}
