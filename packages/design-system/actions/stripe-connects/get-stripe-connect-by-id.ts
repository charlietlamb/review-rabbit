'use server'

import client from '@burse/design-system/lib/client'
import { headersWithCookies } from '@burse/design-system/lib/header-with-cookies'

export async function getStripeConnectById(id: string) {
  const response = await client['stripe-connects-by-id'].$get(
    {
      json: { id },
    },
    await headersWithCookies()
  )
  const data = await response.json()
  if ('error' in data) {
    return { error: data.error as string }
  }
  return data.stripeConnect
}
