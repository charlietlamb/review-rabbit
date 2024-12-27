'use server'

import { StripeConnect } from '@burse/database'
import client from '@burse/design-system/lib/client'
import { headersWithCookies } from '@burse/design-system/lib/header-with-cookies'
import { PAGE_SIZE } from '@burse/design-system/data/page-size'

export async function getStripeConnects(
  page: number
): Promise<StripeConnect[]> {
  const response = await client['stripe-connects'].$post(
    {
      json: { offset: page * PAGE_SIZE, limit: PAGE_SIZE },
    },
    await headersWithCookies()
  )
  const json = await response.json()
  if ('error' in json) {
    throw new Error(json.error)
  }
  return json.stripeConnects.map((connect: any) => ({
    ...connect,
    createdAt: new Date(connect.createdAt),
    updatedAt: new Date(connect.updatedAt),
  }))
}
