import { AppRouteHandler } from '@remio/hono/lib/types'
import { HttpStatusCodes } from '@remio/http'
import { stripeConnects } from '@remio/database/schema/stripe-connects'
import { db } from '@remio/database'
import {
  ConnectGetRoute,
  ConnectRefreshRoute,
  ConnectReturnRoute,
  ConnectRoute,
  PaymentSuccessRoute,
} from './stripe.routes'
import { stripe } from '@remio/stripe'
import { and, eq } from 'drizzle-orm'
import { env } from '@remio/env'
import { invoices } from '@remio/database'

export const connect: AppRouteHandler<ConnectRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  try {
    const account = await stripe.accounts.create({})
    await db.insert(stripeConnects).values({
      id: account.id,
      userId: user.id,
    })
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${env.NEXT_PUBLIC_API}/stripe/connect/refresh/${account.id}`,
      return_url: `${env.NEXT_PUBLIC_API}/stripe/connect/return/${account.id}`,
      type: 'account_onboarding',
    })

    return c.json({ redirectUrl: accountLink.url }, HttpStatusCodes.OK)
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

export const connectRefresh: AppRouteHandler<ConnectRefreshRoute> = async (
  c
) => {
  const accountId = c.req.param('accountId')
  if (!accountId) {
    return c.json(
      { error: 'Account ID is required' },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${env.NEXT_PUBLIC_API}/stripe/connect/refresh/${accountId}`,
      return_url: `${env.NEXT_PUBLIC_API}/stripe/connect/return/${accountId}`,
      type: 'account_onboarding',
    })

    return c.redirect(accountLink.url, HttpStatusCodes.MOVED_TEMPORARILY)
  } catch (error) {
    console.error('Error refreshing Stripe Connect account:', error)
    return c.json(
      {
        error: 'Failed to refresh Stripe Connect account',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const connectReturn: AppRouteHandler<ConnectReturnRoute> = async (c) => {
  const accountId = c.req.param('accountId')
  if (!accountId) {
    return c.json(
      { error: 'Account ID is required' },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  try {
    await db
      .update(stripeConnects)
      .set({
        onboardingCompleted: true,
      })
      .where(eq(stripeConnects.id, accountId))

    return c.redirect(
      `${env.NEXT_PUBLIC_WEB}/dashboard/settings/stripe?success=true`,
      HttpStatusCodes.MOVED_TEMPORARILY
    )
  } catch (error) {
    console.error('Error refreshing Stripe Connect account:', error)
    return c.json(
      {
        error: 'Failed to refresh Stripe Connect account',
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
    return c.json({ account }, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error getting Stripe Connect account:', error)

    return c.json(
      {
        error: 'Failed to get Stripe Connect account',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const paymentSuccess: AppRouteHandler<PaymentSuccessRoute> = async (
  c
) => {
  const invoiceId = c.req.param('invoiceId')
  const signature = c.req.header('stripe-signature')
  const sessionId = c.req.query('session_id')

  // Handle webhook case
  if (signature) {
    try {
      const rawBody = await c.req.raw.clone().text()
      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      )

      if (event.type !== 'checkout.session.completed') {
        c.get('logger').info(`Ignored non-payment event: ${event.type}`)
        return c.json(true, HttpStatusCodes.OK)
      }

      const session = event.data.object
      if (!session.metadata?.invoiceId || !session.metadata?.userId) {
        c.get('logger').error('Invalid session metadata', { session })
        return c.json(
          { error: 'Invalid session or missing metadata' },
          HttpStatusCodes.BAD_REQUEST
        )
      }

      await db
        .update(invoices)
        .set({
          paidAt: new Date(),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(invoices.id, invoiceId),
            eq(invoices.userId, session.metadata.userId)
          )
        )

      c.get('logger').info('Payment processed successfully', {
        invoiceId,
        eventId: event.id,
      })

      return c.json(true, HttpStatusCodes.OK)
    } catch (error) {
      c.get('logger').error('Error processing webhook:', error)
      return c.json(
        {
          error: 'Failed to process webhook',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatusCodes.BAD_REQUEST
      )
    }
  }

  // Handle redirect case
  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)

      if (session.payment_status === 'paid') {
        await db
          .update(invoices)
          .set({
            paidAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(invoices.id, invoiceId))

        return c.redirect(
          `${env.NEXT_PUBLIC_WEB}/success`,
          HttpStatusCodes.MOVED_TEMPORARILY
        )
      }

      return c.redirect(
        `${env.NEXT_PUBLIC_WEB}/failed?message=Payment%20failed`,
        HttpStatusCodes.MOVED_TEMPORARILY
      )
    } catch (error) {
      console.error('Error processing payment success:', error)
      return c.redirect(
        `${env.NEXT_PUBLIC_WEB}/failed?message=Payment%20verification%20failed`,
        HttpStatusCodes.MOVED_TEMPORARILY
      )
    }
  }

  return c.json(
    { error: 'Invalid request - missing signature or session_id' },
    HttpStatusCodes.BAD_REQUEST
  )
}
