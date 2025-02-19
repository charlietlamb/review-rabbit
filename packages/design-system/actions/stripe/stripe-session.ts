'use server'

import { env } from '@rabbit/env'
import { redirect } from 'next/navigation'
import { Plan } from '@rabbit/hono/lib/types'
import { getStripe } from '@rabbit/stripe'
import { getKv } from '@rabbit/kv'
import { User } from '@rabbit/database'

export const postStripeSession = async ({
  user,
  priceId,
  plan,
}: {
  user: User
  priceId: string
  plan: Plan
}) => {
  const successUrl = `${env.NEXT_PUBLIC_WEB}/success?plan=${plan}`
  const cancelUrl = `${env.NEXT_PUBLIC_WEB}/failed`

  const kv = getKv(env)
  const stripe = getStripe(env)

  let stripeCustomerId = (await kv.get(`stripe:user:${user.id}`)) as
    | string
    | null
  if (!stripeCustomerId) {
    const newCustomer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id,
      },
    })

    await kv.set(`stripe:user:${user.id}`, newCustomer.id)
    stripeCustomerId = newCustomer.id
  }

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
    customer: stripeCustomerId,
  })
  if (!session.url) throw new Error('Error initiating Stripe session')
  redirect(session.url)
}
