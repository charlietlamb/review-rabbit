'use server'

import client from '@burse/design-system/lib/client'
import { headersWithCookies } from '@burse/design-system/lib/header-with-cookies'

export async function deauthorizeStripeConnect(id: string) {
  const response = await client.stripe.deauthorize[`:accountId`].$post(
    {
      param: { accountId: id },
    },
    await headersWithCookies()
  )
  const data = await response.json()
  if ('error' in data) {
    return false
  }
  return true
}
