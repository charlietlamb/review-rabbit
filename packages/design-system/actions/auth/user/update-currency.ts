'use server'

import client from '@burse/design-system/lib/client'
import { headersWithCookies } from '@burse/design-system/lib/header-with-cookies'

export async function updateCurrency(currency: string): Promise<number> {
  const response = await client.user['update-currency'].$post(
    {
      json: { currency },
    },
    await headersWithCookies()
  )
  return response.status
}
