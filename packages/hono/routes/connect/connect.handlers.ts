import { AppRouteHandler } from '@ff/hono/lib/types'
import { HttpStatusCodes } from '@ff/http'
import { db } from '@ff/database'
import * as schema from '@ff/database/schema'
import { eq, and } from 'drizzle-orm'
import { env } from '@ff/env'
import {
  ConnectInitiateRoute,
  ConnectCallbackRoute,
  RefreshTokensRoute,
  DisconnectRoute,
  GetProviderConnectsRoute,
} from './connect.routes'
import { providerMap } from '../../connect/providers/provider-map'
import { InstagramProfile } from '../../connect/providers/instagram'
import { connects } from '@ff/database/schema/connects'
import {
  getAccountId,
  getAccountName,
  getProfileImageUrl,
  getUsername,
} from './connect.helpers'

// Handler for initiating OAuth flow
export const connectInitiate: AppRouteHandler<ConnectInitiateRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const { providerId } = c.req.param()
  const provider = providerMap.get(providerId)

  if (!provider) {
    return c.json({ error: 'Provider not found' }, HttpStatusCodes.BAD_REQUEST)
  }

  const state = crypto.randomUUID()
  const redirectURI = `${env.NEXT_PUBLIC_API}/connect/${providerId}/callback`

  try {
    const authURL = await provider.createAuthorizationURL({
      state,
      redirectURI,
    })

    // Store state in verifications table
    await db.insert(schema.verifications).values({
      id: state,
      identifier: user.id,
      value: state,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiry
    })

    return c.json({ redirectURI: authURL.toString() }, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to create authorization URL' },
      HttpStatusCodes.BAD_REQUEST
    )
  }
}

// Handler for OAuth callback
export const connectCallback: AppRouteHandler<ConnectCallbackRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const { providerId } = c.req.param()
  const { code, state } = c.req.query()
  const provider = providerMap.get(providerId)

  if (!provider) {
    return c.json({ error: 'Provider not found' }, HttpStatusCodes.BAD_REQUEST)
  }

  // Verify state from verifications table
  const verification = await db.query.verifications.findFirst({
    where: and(
      eq(schema.verifications.identifier, user.id),
      eq(schema.verifications.value, state)
    ),
  })

  if (!verification || verification.expiresAt < new Date()) {
    return c.json({ error: 'Invalid state' }, HttpStatusCodes.BAD_REQUEST)
  }

  try {
    const redirectURI = `${env.NEXT_PUBLIC_API}/connect/${providerId}/callback`
    console.log('Attempting to validate code with:', {
      code,
      state,
      redirectURI,
    })

    const tokens = await provider.validateAuthorizationCode({
      code,
      state,
      redirectURI,
    })

    // Get user profile to identify the account
    const profile = await provider.getUserProfile(tokens.accessToken)
    const accountId = getAccountId(profile, providerId)

    // Check if account is already connected
    const existingConnection = await db
      .select()
      .from(schema.connects)
      .where(
        and(
          eq(schema.connects.userId, user.id),
          eq(schema.connects.providerId, providerId),
          eq(schema.connects.accountId, accountId)
        )
      )
      .limit(1)
      .then((rows) => rows[0])

    if (existingConnection) {
      return c.redirect(
        `${env.NEXT_PUBLIC_WEB}/dashboard/connect/${providerId}?status=already-connected`
      )
    }

    // Clean up used verification
    await db
      .delete(schema.verifications)
      .where(eq(schema.verifications.id, verification.id))

    // Store tokens in database
    await db.insert(schema.connects).values({
      userId: user.id,
      providerId,
      accountId,
      accountName: getAccountName(profile, providerId),
      username: getUsername(profile, providerId),
      profileImageUrl: getProfileImageUrl(profile, providerId),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresAt: tokens.expiresAt,
    })

    return c.redirect(
      `${env.NEXT_PUBLIC_WEB}/dashboard/connect/${providerId}?status=success`
    )
  } catch (error) {
    console.error('Token validation error:', error)
    return c.redirect(
      `${env.NEXT_PUBLIC_WEB}/dashboard/connect/${providerId}?status=error`
    )
  }
}

// Handler for refreshing tokens
export const refreshTokens: AppRouteHandler<RefreshTokensRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const { connectionId } = c.req.param() // Use connectionId instead of providerId

  try {
    // Get existing connection
    const connection = await db
      .select()
      .from(schema.connects)
      .where(
        and(
          eq(schema.connects.userId, user.id),
          eq(schema.connects.id, connectionId)
        )
      )
      .limit(1)
      .then((rows) => rows[0])

    if (!connection) {
      return c.json(
        { error: 'Connection not found' },
        HttpStatusCodes.NOT_FOUND
      )
    }

    if (!connection.refreshToken) {
      return c.json(
        { error: 'No refresh token available' },
        HttpStatusCodes.BAD_REQUEST
      )
    }

    const provider = providerMap.get(connection.providerId)
    if (!provider) {
      return c.json(
        { error: 'Provider not found' },
        HttpStatusCodes.BAD_REQUEST
      )
    }

    // Check if token needs refresh
    if (connection.expiresAt && connection.expiresAt > new Date()) {
      return c.json({ success: true }, HttpStatusCodes.OK)
    }

    // Refresh tokens
    const tokens = await provider.refreshTokens(connection.refreshToken)

    // Update stored tokens
    await db
      .update(schema.connects)
      .set({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt,
        updatedAt: new Date(),
      })
      .where(eq(schema.connects.id, connectionId))

    return c.json({ success: true }, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to refresh tokens' },
      HttpStatusCodes.BAD_REQUEST
    )
  }
}

// Handler for disconnecting provider
export const disconnect: AppRouteHandler<DisconnectRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const { connectionId } = c.req.param() // Use connectionId instead of providerId

  try {
    const result = await db
      .delete(schema.connects)
      .where(
        and(
          eq(schema.connects.userId, user.id),
          eq(schema.connects.id, connectionId)
        )
      )
      .returning()

    if (!result.length) {
      return c.json(
        { error: 'Connection not found' },
        HttpStatusCodes.NOT_FOUND
      )
    }

    return c.json({ success: true }, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to disconnect provider' },
      HttpStatusCodes.BAD_REQUEST
    )
  }
}

//add handler for gettings connects

export const getProviderConnects: AppRouteHandler<
  GetProviderConnectsRoute
> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  let { providerId } = c.req.param()
  if (!providerId) {
    return c.json(
      { error: 'Provider ID is required' },
      HttpStatusCodes.BAD_REQUEST
    )
  }
  try {
    const connections =
      providerId === 'all'
        ? await db.query.connects.findMany({
            where: eq(connects.userId, user.id),
          })
        : await db.query.connects.findMany({
            where: and(
              eq(connects.userId, user.id),
              eq(connects.providerId, providerId)
            ),
          })

    return c.json({ connections }, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to get provider connects' },
      HttpStatusCodes.NOT_FOUND
    )
  }
}
