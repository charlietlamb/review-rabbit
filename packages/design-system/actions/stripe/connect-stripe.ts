'use server'

import client from '@remio/design-system/lib/client'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import { redirect } from 'next/navigation'

export async function connectStripe(): Promise<number> {
  const response = await client.stripe.connect.$get(
    {},
    await headersWithCookies()
  )
  const json = await response.json()
  if ('redirectUrl' in json) {
    redirect(json.redirectUrl)
  }
  return response.status
}
