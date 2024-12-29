import { AppRouteHandler } from '@burse/hono/lib/types'
import { HttpStatusCodes } from '@burse/http'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { stripeOAuthStates } from '@burse/database/schema/stripe/stripe-oauth-states'
import { users } from '@burse/database/schema/auth/users'
import { db } from '@burse/database'
import {
  ConnectGetRoute,
  ConnectRefreshRoute,
  ConnectReturnRoute,
  ConnectRoute,
  DeauthorizeRoute,
} from './stripe.routes'
import { stripe } from '@burse/stripe'
import { and, eq, lt, or } from 'drizzle-orm'
import { getEnv } from '@burse/env'
import crypto from 'crypto'

const STATE_EXPIRY_MINUTES = 30

export const connect: AppRouteHandler<ConnectRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  try {
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

    const redirectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${getEnv().STRIPE_CLIENT_ID}&scope=read_write&state=${state}`

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

    if (
      !response.stripe_user_id ||
      !response.access_token ||
      !response.token_type ||
      !response.scope
    ) {
      throw new Error('Missing required fields in Stripe response')
    }

    const stripeUserId = response.stripe_user_id

    // Start a transaction for all database operations
    await db.transaction(async (tx) => {
      // Check if this specific Stripe account is already connected
      const existingConnect = await tx.query.stripeConnects.findFirst({
        where: eq(stripeConnects.id, stripeUserId),
      })

      const stripeData = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token ?? null,
        tokenType: response.token_type,
        stripePublishableKey: response.stripe_publishable_key ?? null,
        stripeUserId,
        scope: response.scope,
        onboardingCompleted: true,
        updatedAt: new Date(),
      }

      if (existingConnect) {
        // Update existing account
        await tx
          .update(stripeConnects)
          .set(stripeData)
          .where(eq(stripeConnects.id, existingConnect.id))
      } else {
        // Create new account with required fields
        const insertData: typeof stripeConnects.$inferInsert = {
          id: stripeUserId,
          userId: storedState.userId,
          ...stripeData,
        }
        await tx.insert(stripeConnects).values(insertData)
      }

      // Clean up used state
      await tx
        .delete(stripeOAuthStates)
        .where(eq(stripeOAuthStates.state, state))
    })

    return c.redirect(
      `${getEnv().NEXT_PUBLIC_WEB}/dashboard?status=stripe-connected`,
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
    const accounts = await db.query.stripeConnects.findMany({
      where: eq(stripeConnects.userId, user.id),
    })
    return c.json({ accounts }, HttpStatusCodes.OK)
  } catch (error) {
    console.error('Error getting Stripe Connect accounts:', error)
    return c.json(
      {
        error: 'Failed to get Stripe Connect accounts',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const deauthorize: AppRouteHandler<DeauthorizeRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const accountId = c.req.param('accountId')
  if (!accountId) {
    return c.json(
      { error: 'Account ID is required' },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  try {
    // Start transaction
    return await db.transaction(async (tx) => {
      const account = await tx.query.stripeConnects.findFirst({
        where: and(
          eq(stripeConnects.id, accountId),
          eq(stripeConnects.userId, user.id)
        ),
      })

      if (!account) {
        return c.json(
          { error: 'Account not found' },
          HttpStatusCodes.BAD_REQUEST
        )
      }

      // Deauthorize with Stripe
      await stripe.oauth.deauthorize({
        client_id: getEnv().STRIPE_CLIENT_ID,
        stripe_user_id: accountId,
      })

      // Delete the account from our database within the transaction
      await tx.delete(stripeConnects).where(eq(stripeConnects.id, accountId))

      return c.json({ success: true }, HttpStatusCodes.OK)
    })
  } catch (error) {
    console.error('Error deauthorizing Stripe Connect account:', error)
    return c.json(
      {
        error: 'Failed to deauthorize account',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
