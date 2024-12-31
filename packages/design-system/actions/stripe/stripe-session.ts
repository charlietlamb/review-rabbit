'use server'

import { getEnv } from '@rabbit/env'
import { redirect } from 'next/navigation'
import { Plan } from '@rabbit/hono/lib/types'
import { stripe } from '@rabbit/stripe'

export const postStripeSession = async ({
  priceId,
  plan,
}: {
  priceId: string
  plan: Plan
}) => {
  // const successUrl = `${env.NEXT_PUBLIC_API}/stripe/subscription-success?session_id={CHECKOUT_SESSION_ID}`
  const successUrl = `${getEnv().NEXT_PUBLIC_WEB}/welcome?plan=${plan}`
  const cancelUrl = `${getEnv().NEXT_PUBLIC_WEB}/cancel?session_id={CHECKOUT_SESSION_ID}`

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
    metadata: {
      plan,
    },
  })
  if (!session.url) throw new Error('Error initiating Stripe session')
  redirect(session.url)
}
