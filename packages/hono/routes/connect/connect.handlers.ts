import { AppRouteHandler } from '@dubble/hono/lib/types'
import { HttpStatusCodes } from '@dubble/http'
import { db } from '@dubble/database'
import * as schema from '@dubble/database/schema'
import { eq, and } from 'drizzle-orm'
import { env } from '@dubble/env'
import {
  ConnectInitiateRoute,
  ConnectCallbackRoute,
  RefreshTokensRoute,
  DisconnectRoute,
} from './connect.routes'
import { providerMap } from '@dubble/hono/connect/providers/provider-map'
import { connects } from '@dubble/database/schema'

// Extend the Variables interface to include our state
declare module 'hono' {
  interface ContextVariableMap {
    stateVar: { state: string }
  }
}

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

    // Store state in session using the extended Variables interface
    c.set('stateVar', { state })

    // Return the URL for the frontend to handle the redirect
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

  // Verify state matches
  const stateVar = c.get('stateVar')
  if (!stateVar || stateVar.state !== state) {
    return c.json({ error: 'Invalid state' }, HttpStatusCodes.BAD_REQUEST)
  }

  try {
    const redirectURI = `${env.NEXT_PUBLIC_API}/connect/${providerId}/callback`
    const tokens = await provider.validateAuthorizationCode({
      code,
      state,
      redirectURI,
    })

    // Store tokens in database
    await db
      .insert(connects)
      .values({
        userId: user.id,
        providerId,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt,
      })
      .onConflictDoUpdate({
        target: [connects.userId, connects.providerId],
        set: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresAt: tokens.expiresAt,
        },
      })

    return c.json({ success: true }, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to validate authorization code' },
      HttpStatusCodes.BAD_REQUEST
    )
  }
}

// Handler for refreshing tokens
export const refreshTokens: AppRouteHandler<RefreshTokensRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const { providerId } = c.req.param()
  const provider = providerMap.get(providerId)

  if (!provider) {
    return c.json({ error: 'Provider not found' }, HttpStatusCodes.BAD_REQUEST)
  }

  try {
    // Get existing connection
    const connection = await db
      .select()
      .from(connects)
      .where(
        and(eq(connects.userId, user.id), eq(connects.providerId, providerId))
      )
      .limit(1)
      .then((rows) => rows[0])

    if (!connection?.refreshToken) {
      return c.json(
        { error: 'No refresh token found' },
        HttpStatusCodes.BAD_REQUEST
      )
    }

    // Refresh tokens
    const tokens = await provider.refreshTokens(connection.refreshToken)

    // Update stored tokens
    await db
      .update(connects)
      .set({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt,
      })
      .where(
        and(eq(connects.userId, user.id), eq(connects.providerId, providerId))
      )

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

  const { providerId } = c.req.param()

  try {
    const result = await db
      .delete(schema.connects)
      .where(
        and(
          eq(schema.connects.userId, user.id),
          eq(schema.connects.providerId, providerId)
        )
      )
      .returning()

    if (!result.length) {
      return c.json(
        { error: 'Provider connection not found' },
        HttpStatusCodes.BAD_REQUEST
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
