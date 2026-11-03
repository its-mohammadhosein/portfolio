import { withHeaderDefaults } from '@/dyson/globals'
import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function Header() {
  // html base logo / badge / nav where Payload has nothing
  const headerData = withHeaderDefaults(await getCachedGlobal('header', 1)())

  return <HeaderClient data={headerData} />
}
