import { HttpStatusCodes } from '@rabbit/http'
import {
  CreateBusinessRoute,
  GetBusinessRoute,
  GetBusinessByIdRoute,
  UpdateBusinessRoute,
  DeleteBusinessRoute,
  CallbackRoute,
} from '@rabbit/hono/routes/business/business.routes'
import { AppRouteHandler } from '@rabbit/hono/lib/types'
import { db } from '@rabbit/database'
import { businesses, accounts } from '@rabbit/database/schema'
import { and, eq } from 'drizzle-orm'
import { getEnv } from '@rabbit/env'
import { OAuth2Client } from 'google-auth-library'
import { GOOGLE_BUSINESS_SCOPE } from '@rabbit/google/lib/data'
export const create: AppRouteHandler<CreateBusinessRoute> = async (c) => {
  const user = await c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const body = await c.req.valid('json')
  try {
    await db.insert(businesses).values({
      ...body,
      userId: user.id,
    })
  } catch (error) {
    return c.json(
      { error: 'Failed to create business' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }

  return c.json({ success: true }, HttpStatusCodes.OK)
}

export const get: AppRouteHandler<GetBusinessRoute> = async (c) => {
  const user = await c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { offset, limit } = await c.req.valid('json')

  try {
    const businessesFromDatabase = await db.query.businesses.findMany({
      where: eq(businesses.userId, user.id),
      offset,
      limit,
      with: {
        locations: true,
      },
    })
    return c.json(businessesFromDatabase, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to retrieve businesses' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const getById: AppRouteHandler<GetBusinessByIdRoute> = async (c) => {
  const user = await c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id } = await c.req.valid('json')
  try {
    const businessFromDatabase = await db.query.businesses.findFirst({
      where: and(eq(businesses.id, id), eq(businesses.userId, user.id)),
      with: {
        locations: true,
      },
    })
    return c.json(businessFromDatabase, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to retrieve business' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const update: AppRouteHandler<UpdateBusinessRoute> = async (c) => {
  const user = await c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id, ...body } = await c.req.valid('json')
  try {
    await db
      .update(businesses)
      .set(body)
      .where(and(eq(businesses.id, id), eq(businesses.userId, user.id)))

    return c.json({ success: true }, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to update business' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const deleteBusiness: AppRouteHandler<DeleteBusinessRoute> = async (
  c
) => {
  const user = await c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const { id } = await c.req.valid('json')
  try {
    await db
      .delete(businesses)
      .where(and(eq(businesses.id, id), eq(businesses.userId, user.id)))

    return c.json({ success: true }, HttpStatusCodes.OK)
  } catch (error) {
    return c.json(
      { error: 'Failed to delete business' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const callback: AppRouteHandler<CallbackRoute> = async (c) => {
  const { code, state } = c.req.query()

  if (!code || !state) {
    return c.json(
      { error: 'Missing required parameters' },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  try {
    const oauth2Client = new OAuth2Client(
      getEnv().NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      getEnv().GOOGLE_CLIENT_SECRET,
      `${getEnv().NEXT_PUBLIC_API}/business/callback/success`
    )

    const { tokens } = await oauth2Client.getToken(code)

    if (!tokens.access_token) {
      return c.redirect(`${getEnv().NEXT_PUBLIC_WEB}/dashboard`)
    }

    // Get existing account to check current scopes
    const existingAccount = await db.query.accounts.findFirst({
      where: eq(accounts.id, state),
    })

    const existingScopes =
      existingAccount?.scope?.split(',').filter(Boolean) || []
    const uniqueScopes = [
      ...new Set([...existingScopes, GOOGLE_BUSINESS_SCOPE]),
    ].join(',')

    await db
      .update(accounts)
      .set({
        accessToken: tokens.access_token,
        accessTokenExpiresAt: tokens.expiry_date
          ? new Date(tokens.expiry_date)
          : null,
        refreshToken: tokens.refresh_token || undefined,
        scope: uniqueScopes || undefined,
        idToken: tokens.id_token || undefined,
      })
      .where(eq(accounts.id, state))

    return c.redirect(`${getEnv().NEXT_PUBLIC_WEB}/dashboard/reviews`)
  } catch (error) {
    console.error('Error in callback:', error)
    return c.json(
      { error: 'Failed to handle callback' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
