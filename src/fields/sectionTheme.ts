import type { SelectField } from 'payload'

/** Section background: the html base alternates white and black sections. */
export const sectionTheme = (defaultValue: 'light' | 'dark' = 'light'): SelectField => ({
  name: 'theme',
  type: 'select',
  defaultValue,
  options: [
    { label: 'Light (white)', value: 'light' },
    { label: 'Dark (black)', value: 'dark' },
  ],
  admin: {
    description: 'Section background',
  },
})
