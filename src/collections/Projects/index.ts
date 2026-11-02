import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { displayTitle } from '@/fields/displayTitle'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateProject } from './hooks/revalidateProject'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

/**
 * Portfolio projects. All html base project pages share one fixed template
 * (title → hero image → overview + meta → full-width images → more works), so a project is
 * structured fields rather than a block layout.
 */
export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // What portfolio grids and links need when a project is referenced
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    cover: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'year', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'projects',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'projects',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            displayTitle('heroTitle', {
              admin: {
                description:
                  'Title as shown on the project page, e.g. "The First⏎Brand". Falls back to the title. *text* = italic, ==text== = red.',
              },
            }),
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'cover',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Card image used in portfolio grids.',
              },
            },
          ],
        },
        {
          label: 'Overview',
          fields: [
            {
              name: 'overviewLabel',
              type: 'text',
              defaultValue: 'Overview',
              admin: {
                description: 'Marquee word above the overview.',
              },
            },
            {
              name: 'overview',
              type: 'textarea',
            },
            {
              type: 'row',
              fields: [
                { name: 'year', type: 'text', admin: { width: '33%' } },
                { name: 'client', type: 'text', admin: { width: '33%' } },
                { name: 'services', type: 'text', admin: { width: '34%' } },
              ],
            },
            {
              name: 'liveUrl',
              type: 'text',
              label: 'Live URL',
              admin: {
                description: 'Shown as the "View Online" button when set.',
              },
            },
          ],
        },
        {
          label: 'Gallery',
          fields: [
            {
              name: 'gallery',
              type: 'array',
              admin: {
                initCollapsed: true,
                description: 'Full-width images below the overview, in order.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                      admin: { width: '70%' },
                    },
                    {
                      name: 'speed',
                      type: 'number',
                      defaultValue: 0.9,
                      admin: {
                        width: '30%',
                        step: 0.05,
                        description: 'Parallax speed (1 = none)',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'More works',
          fields: [
            displayTitle('moreTitle', {
              defaultValue: 'Discover\nmore Works',
            }),
            {
              name: 'moreProjects',
              type: 'relationship',
              relationTo: 'projects',
              hasMany: true,
              maxRows: 4,
              filterOptions: ({ id }) => ({
                id: {
                  not_in: [id],
                },
              }),
              admin: {
                description: 'Leave empty to show the next two projects.',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'categories',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateProject],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
