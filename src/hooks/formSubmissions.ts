import type { CollectionBeforeValidateHook, Field, FieldHook } from 'payload'

import { APIError } from 'payload'

import { HONEYPOT_FIELD } from '@/blocks/Form/honeypot'

type SubmissionDatum = { field?: string | null; value?: unknown }

/** Rejects submissions that carry a filled honeypot (bots posting straight to the API). */
export const rejectHoneypot: CollectionBeforeValidateHook = ({ data }) => {
  const entries = (data?.submissionData ?? []) as SubmissionDatum[]
  if (entries.some((entry) => entry.field === HONEYPOT_FIELD && entry.value)) {
    throw new APIError('Submission rejected.', 400)
  }
  return data
}

const valueOf =
  (names: string[]): FieldHook =>
  ({ siblingData }) => {
    const entries = (siblingData?.submissionData ?? []) as SubmissionDatum[]
    const match = entries.find((entry) => entry.field && names.includes(entry.field))
    return match?.value ? String(match.value) : null
  }

/** Read-only virtual columns for the admin list (no database columns). */
export const submissionSummaryFields: Field[] = [
  {
    name: 'senderName',
    label: 'Name',
    type: 'text',
    virtual: true,
    admin: { readOnly: true },
    hooks: { afterRead: [valueOf(['your-name', 'name', 'full-name'])] },
  },
  {
    name: 'senderEmail',
    label: 'Email',
    type: 'text',
    virtual: true,
    admin: { readOnly: true },
    hooks: { afterRead: [valueOf(['your-email', 'email'])] },
  },
]
