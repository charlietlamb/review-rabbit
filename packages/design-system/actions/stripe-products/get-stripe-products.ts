'use server'

import { StripeProductWithData } from '@burse/database'
import client from '@burse/design-system/lib/client'
import { headersWithCookies } from '@burse/design-system/lib/header-with-cookies'
import { PAGE_SIZE } from '@burse/design-system/data/page-size'

export async function getStripeProducts(
  page: number,
  stripeConnectId: string
): Promise<StripeProductWithData[]> {
  const response = await client['stripe-products'].$post(
    {
      json: { offset: page * PAGE_SIZE, limit: PAGE_SIZE, stripeConnectId },
    },
    await headersWithCookies()
  )
  const json = await response.json()
  if ('error' in json) {
    throw new Error(json.error)
  }
  return json.stripeProducts.map((product: any) => ({
    ...product,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt),
  }))
}
