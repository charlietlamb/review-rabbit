'use server'

import { ProductFormSchema } from '@burse/design-system/types/stripe/products'
import client from '@burse/design-system/lib/client'
import { headersWithCookies } from '@burse/design-system/lib/header-with-cookies'

export async function createStripeProduct(
  product: ProductFormSchema,
  stripeConnectId: string
) {
  const response = await client['stripe-products'].create.$post(
    {
      json: { ...product, stripeConnectId },
    },
    await headersWithCookies()
  )
  return response.status
}
