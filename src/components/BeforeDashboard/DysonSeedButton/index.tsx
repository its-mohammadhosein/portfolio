'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

/** Runs /next/seed-dyson: the Dyson pages, projects and globals (safe to run again). */
export const DysonSeedButton: React.FC = () => {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if (state === 'loading') {
        toast.info('Seeding already in progress.')
        return
      }
      setState('loading')
      toast.promise(
        fetch('/next/seed-dyson', { method: 'POST', credentials: 'include' }).then((res) => {
          if (!res.ok) {
            setState('error')
            throw new Error('An error occurred while seeding.')
          }
          setState('done')
        }),
        {
          loading: 'Seeding the Dyson content (this can take a few minutes)...',
          success: 'Dyson content seeded! Visit your website.',
          error: 'An error occurred while seeding the Dyson content.',
        },
      )
    },
    [state],
  )

  const message = {
    idle: '',
    loading: ' (seeding...)',
    done: ' (done!)',
    error: ' (error — check the server logs)',
  }[state]

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick}>
        Seed the Dyson content
      </button>
      {message}
    </Fragment>
  )
}
