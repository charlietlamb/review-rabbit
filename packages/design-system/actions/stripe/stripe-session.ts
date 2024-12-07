'use server'

import { env } from '@remio/env'
import { redirect } from 'next/navigation'
import { Plan } from '@remio/hono/lib/types'
import { stripe } from '@remio/stripe'

export const postStripeSession = async ({
  priceId,
  plan,
}: {
  priceId: string
  plan: Plan
}) => {
  const successUrl = `${env.NEXT_PUBLIC_DOMAIN}welcome?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${env.NEXT_PUBLIC_DOMAIN}cancel?session_id={CHECKOUT_SESSION_ID}`

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
  })
  if (!session.url) throw new Error('Error initiating Stripe session')
  redirect(session.url)
}
