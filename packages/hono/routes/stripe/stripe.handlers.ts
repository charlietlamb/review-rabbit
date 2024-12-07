import { AppRouteHandler } from '@remio/hono/lib/types'
import { HttpStatusCodes } from '@remio/http'
import { stripeConnects } from '@remio/database/schema/stripe-connects'
import { db } from '@remio/database'
import { ConnectGetRoute, ConnectRoute } from './stripe.routes'
import { stripe } from '@remio/stripe'
import { eq } from 'drizzle-orm'

export const connect: AppRouteHandler<ConnectRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  try {
    const account = await stripe.accounts.create({
      type: 'express',
      email: user.email,
      country: 'GB',
    })

    // Update user with Stripe Connect account ID
    await db.insert(stripeConnects).values({
      id: account.id,
      userId: user.id,
    })

    return c.json({ success: true }, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error creating Stripe Connect account:', error)

    return c.json(
      {
        error: 'Failed to create Stripe Connect account',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const connectGet: AppRouteHandler<ConnectGetRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  try {
    const account = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.userId, user.id),
    })
    return c.json(account, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error getting Stripe Connect account:', error)

    return c.json(
      {
        error: 'Failed to get Stripe Connect account',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
