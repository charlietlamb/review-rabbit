'use server'

import client from '@burse/design-system/lib/client'
import { headersWithCookies } from '@burse/design-system/lib/header-with-cookies'

export async function updateStripeConnect(id: string, title: string) {
  const response = await client['stripe-connects']['update'].$post(
    {
      json: { id, title },
    },
    await headersWithCookies()
  )
  const data = await response.json()
  if ('error' in data) {
    console.error(data.error)
    return false
  }
  return true
}
