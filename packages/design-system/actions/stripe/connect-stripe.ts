'use server'

import client from '@remio/design-system/lib/client'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'

export async function connectStripe(): Promise<number> {
  const response = await client.stripe.connect.$get(
    {},
    await headersWithCookies()
  )
  return response.status
}
