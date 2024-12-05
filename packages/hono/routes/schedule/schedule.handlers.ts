import { providerMap } from '@ff/hono/connect/providers/provider-map'
import { ProviderWithSchedule, ScheduleHandlers } from '@ff/hono/connect/types'
import { AppRouteHandler } from '@ff/hono/lib/types'
import { ScheduleContentRoute } from '@ff/hono/routes/schedule/schedule.routes'
import { HttpStatusCodes } from '@ff/http'
import { db } from '@ff/database'
import { connects } from '@ff/database/schema'
import { and, eq } from 'drizzle-orm'
import { refreshTokensCheck } from '@ff/hono/connect/utils/tokens/refresh-tokens-check'

export const scheduleContent: AppRouteHandler<ScheduleContentRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const { providerId, type } = c.req.param()
  const body = await c.req.json()

  const provider = providerMap.get(providerId) as ProviderWithSchedule
  if (!provider) {
    return c.json(
      { error: `Unsupported provider: ${providerId}` },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  try {
    const connection = await db.query.connects.findFirst({
      where: and(
        eq(connects.userId, user.id),
        eq(connects.providerId, providerId)
      ),
    })

    if (!connection) {
      return c.json(
        { error: 'Provider not connected' },
        HttpStatusCodes.BAD_REQUEST
      )
    }

    if (refreshTokensCheck(connection)) {
      const tokens = await provider.refreshTokens(connection.refreshToken!)
      await db
        .update(connects)
        .set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresAt: tokens.expiresAt,
          updatedAt: new Date(),
        })
        .where(eq(connects.id, connection.id))
      connection.accessToken = tokens.accessToken
    }

    if (!provider.scheduleHandlers[type as keyof ScheduleHandlers]) {
      return c.json(
        { error: `Unsupported content type: ${type}` },
        HttpStatusCodes.BAD_REQUEST
      )
    }

    const requestData = {
      ...body,
      accessToken: connection.accessToken,
    }

    const result = await provider.scheduleHandlers[
      type as keyof ScheduleHandlers
    ](requestData)

    return c.json({ success: true, data: result }, HttpStatusCodes.OK)
  } catch (error) {
    console.error(`Error scheduling ${type} content for ${providerId}:`, error)
    return c.json(
      { error: 'Failed to schedule content' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
