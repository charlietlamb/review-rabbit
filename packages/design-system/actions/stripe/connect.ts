'use server'

import client from '@rabbit/design-system/lib/client'
import { headersWithCookies } from '@rabbit/design-system/lib/header-with-cookies'

export interface ConnectStripeResponse {
  redirectUrl?: string
  error?: string
}

export async function connectStripe(): Promise<ConnectStripeResponse> {
  try {
    const response = await client.stripe.connect.$get(
      {},
      await headersWithCookies()
    )
    const data = await response.json()

    if ('error' in data) {
      return { error: data.error || 'Failed to get OAuth URL' }
    }

    return { redirectUrl: data.redirectUrl }
  } catch (error) {
    console.error('Error connecting to Stripe:', error)
    return { error: 'Failed to connect to Stripe' }
  }
}
