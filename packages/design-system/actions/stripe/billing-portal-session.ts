'use server'

import Stripe from 'stripe'
import { getStripe } from '@rabbit/stripe'
import { env } from '@rabbit/env'

export async function postBillingPortalSession(customerId: string) {
  const stripe = getStripe(env)
  const returnUrl = `${env.NEXT_PUBLIC_WEB}/dashboard/settings/billing`

  // Get or create a portal configuration
  const configurations = await stripe.billingPortal.configurations.list()
  let config = configurations.data[0]

  if (!config) {
    // Get all products for the subscription update feature
    const products = await stripe.products.list({
      active: true,
      type: 'service',
    })

    const configuration: Stripe.BillingPortal.ConfigurationCreateParams = {
      features: {
        payment_method_update: {
          enabled: true,
        },
        subscription_cancel: {
          enabled: true,
          mode: 'at_period_end',
          cancellation_reason: {
            enabled: true,
            options: [
              'too_expensive',
              'missing_features',
              'switched_service',
              'unused',
              'other',
            ],
          },
        },
        invoice_history: {
          enabled: true,
        },
        subscription_update: {
          enabled: true,
          default_allowed_updates: ['price'],
          products: products.data.map((product) => ({
            product: product.id,
            prices: product.default_price
              ? [product.default_price as string]
              : [],
          })),
          proration_behavior: 'create_prorations',
        },
      },
      business_profile: {
        headline: 'Manage your Review Rabbit subscription',
        privacy_policy_url: `${env.NEXT_PUBLIC_WEB}/privacy`,
        terms_of_service_url: `${env.NEXT_PUBLIC_WEB}/terms`,
      },
    }

    config = await stripe.billingPortal.configurations.create(configuration)
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
    configuration: config.id,
  })

  if (!session.url) throw new Error('Error initiating billing portal session')
  return session.url
}
