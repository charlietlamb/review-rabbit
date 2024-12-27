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
} from './stripe.routes'
import { stripe } from '@burse/stripe'
import { and, eq, lt, or } from 'drizzle-orm'
import { env } from '@burse/env'
import crypto from 'crypto'

const STATE_EXPIRY_MINUTES = 30

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

    // Clean up any existing states for this user and expired states
    await db
      .delete(stripeOAuthStates)
      .where(
        or(
          eq(stripeOAuthStates.userId, user.id),
          lt(stripeOAuthStates.expiresAt, new Date())
        )
      )

    // Generate state for CSRF protection
    const state = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + STATE_EXPIRY_MINUTES * 60 * 1000)

    // Store state in database
    await db.insert(stripeOAuthStates).values({
      state,
      userId: user.id,
      expiresAt,
    })

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
      `${env.NEXT_PUBLIC_WEB}/dashboard?status=onboarding-completed`,
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
