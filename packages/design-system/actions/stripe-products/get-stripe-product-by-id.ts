'use server'

import { StripeProductWithData } from '@burse/database'
import client from '@burse/design-system/lib/client'
import { headersWithCookies } from '@burse/design-system/lib/header-with-cookies'

export async function getStripeProductById(
  stripeProductId: string
): Promise<StripeProductWithData> {
  const response = await client['stripe-products']['by-id'].$post(
    {
      json: { stripeProductId },
    },
    await headersWithCookies()
  )
  const json = await response.json()
  if ('error' in json) {
    throw new Error(json.error)
  }
  return {
    ...json.stripeProduct,
    createdAt: new Date(json.stripeProduct.createdAt),
    updatedAt: new Date(json.stripeProduct.updatedAt),
    stripeConnect: {
      ...json.stripeProduct.stripeConnect,
      createdAt: new Date(json.stripeProduct.stripeConnect.createdAt),
      updatedAt: new Date(json.stripeProduct.stripeConnect.updatedAt),
    },
    prices: json.stripeProduct.prices.map((price: any) => ({
      ...price,
      createdAt: new Date(price.createdAt),
      updatedAt: new Date(price.updatedAt),
    })),
  }
}
