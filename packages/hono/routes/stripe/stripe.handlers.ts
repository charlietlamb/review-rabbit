import { AppRouteHandler } from '@burse/hono/lib/types'
import { HttpStatusCodes } from '@burse/http'
import { stripeConnects } from '@burse/database/schema/stripe-connects'
import { stripeOAuthStates } from '@burse/database/schema/stripe-oauth-states'
import { db } from '@burse/database'
import {
  ConnectGetRoute,
  ConnectRefreshRoute,
  ConnectReturnRoute,
  ConnectRoute,
  PaymentSuccessRoute,
  SubscriptionSuccessRoute,
} from './stripe.routes'
import { stripe } from '@burse/stripe'
import { and, eq, lt } from 'drizzle-orm'
import { env } from '@burse/env'
import { invoices } from '@burse/database'
import { users } from '@burse/database'
import { Plan } from '@burse/hono/lib/types'
import crypto from 'crypto'

const STATE_EXPIRY_MINUTES = 10

export const connect: AppRouteHandler<ConnectRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  try {
    // Check if user already has a connected account
    const existingConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.userId, user.id),
    })

    if (existingConnect?.onboardingCompleted) {
      return c.json(
        { error: 'Account already connected' },
        HttpStatusCodes.BAD_REQUEST
      )
    }

    // Generate state for CSRF protection
    const state = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + STATE_EXPIRY_MINUTES * 60 * 1000)

    // Store state in database
    await db.insert(stripeOAuthStates).values({
      state,
      userId: user.id,
      expiresAt,
    })

    // Clean up expired states
    await db
      .delete(stripeOAuthStates)
      .where(lt(stripeOAuthStates.expiresAt, new Date()))

    const redirectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${env.STRIPE_CLIENT_ID}&scope=read_write&state=${state}`

    return c.json({ redirectUrl }, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error creating Stripe Connect OAuth URL:', error)
    return c.json(
      {
        error: 'Failed to create Stripe Connect OAuth URL',
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
    const account = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.id, accountId),
    })

    if (!account?.refreshToken) {
      return c.json(
        { error: 'No refresh token found' },
        HttpStatusCodes.BAD_REQUEST
      )
    }

    const response = await stripe.oauth.token({
      grant_type: 'refresh_token',
      refresh_token: account.refreshToken,
    })

    await db
      .update(stripeConnects)
      .set({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        tokenType: response.token_type,
        scope: response.scope,
        updatedAt: new Date(),
      })
      .where(eq(stripeConnects.id, accountId))

    return c.json({ success: true }, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error refreshing OAuth token:', error)
    return c.json(
      {
        error: 'Failed to refresh OAuth token',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const connectReturn: AppRouteHandler<ConnectReturnRoute> = async (c) => {
  const code = c.req.query('code')
  const state = c.req.query('state')

  if (!code || !state) {
    return c.json(
      { error: 'Missing code or state' },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  // Get and verify the state from database
  const storedState = await db.query.stripeOAuthStates.findFirst({
    where: eq(stripeOAuthStates.state, state),
  })

  if (!storedState) {
    return c.json(
      { error: 'Invalid state: Not found' },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  if (new Date() > storedState.expiresAt) {
    await db.delete(stripeOAuthStates).where(eq(stripeOAuthStates.state, state))
    return c.json({ error: 'State expired' }, HttpStatusCodes.BAD_REQUEST)
  }

  try {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    })

    if (!response.stripe_user_id) {
      throw new Error('No stripe_user_id in response')
    }

    // Check if account already exists
    const existingConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.userId, storedState.userId),
    })

    if (existingConnect) {
      // Update existing account
      await db
        .update(stripeConnects)
        .set({
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          tokenType: response.token_type,
          stripePublishableKey: response.stripe_publishable_key,
          stripeUserId: response.stripe_user_id,
          scope: response.scope,
          onboardingCompleted: true,
          updatedAt: new Date(),
        })
        .where(eq(stripeConnects.id, existingConnect.id))
    } else {
      // Create new account
      const newConnect = {
        id: response.stripe_user_id,
        userId: storedState.userId,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        tokenType: response.token_type,
        stripePublishableKey: response.stripe_publishable_key,
        stripeUserId: response.stripe_user_id,
        scope: response.scope,
        onboardingCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await db.insert(stripeConnects).values(newConnect)
    }

    // Clean up used state
    await db.delete(stripeOAuthStates).where(eq(stripeOAuthStates.state, state))

    return c.redirect(
      `${env.NEXT_PUBLIC_WEB}/dashboard/settings/stripe?success=true`,
      HttpStatusCodes.MOVED_TEMPORARILY
    )
  } catch (error) {
    console.error('Error completing OAuth flow:', error)
    return c.json(
      {
        error: 'Failed to complete OAuth flow',
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

export const subscriptionSuccess: AppRouteHandler<
  SubscriptionSuccessRoute
> = async (c) => {
  const sessionId = c.req.query('session_id')
  if (!sessionId) {
    return c.json(
      { error: 'Session ID is required' },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const user = c.get('user')

    if (!user) {
      return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
    }

    if (session.payment_status === 'paid' && session.metadata?.plan) {
      await db
        .update(users)
        .set({
          plan: session.metadata.plan as Plan,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id))

      return c.redirect(
        `${env.NEXT_PUBLIC_WEB}/welcome?plan=${session.metadata.plan}`,
        HttpStatusCodes.MOVED_TEMPORARILY
      )
    }

    return c.redirect(
      `${env.NEXT_PUBLIC_WEB}/failed?message=Subscription%20failed`,
      HttpStatusCodes.MOVED_TEMPORARILY
    )
  } catch (error) {
    console.error('Error processing subscription success:', error)
    return c.redirect(
      `${env.NEXT_PUBLIC_WEB}/failed?message=Subscription%20verification%20failed`,
      HttpStatusCodes.MOVED_TEMPORARILY
    )
  }
}
