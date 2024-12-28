'use server'

import { ProductFormSchema } from '@burse/design-system/types/stripe/products'
import client from '@burse/design-system/lib/client'
import { headersWithCookies } from '@burse/design-system/lib/header-with-cookies'

export async function updateStripeProduct(
  product: ProductFormSchema,
  productId: string
) {
  const response = await client['stripe-products'].update.$post(
    {
      json: { ...product, productId },
    },
    await headersWithCookies()
  )
  return response.status
}
