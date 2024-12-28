'use server'

import client from '@burse/design-system/lib/client'
import { headersWithCookies } from '@burse/design-system/lib/header-with-cookies'

export async function deleteStripeProduct(productId: string) {
  const response = await client['stripe-products'].delete.$post(
    {
      json: { productId },
    },
    await headersWithCookies()
  )
  return response.status
}
