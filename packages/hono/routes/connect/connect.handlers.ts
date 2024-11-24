import { AppRouteHandler } from '@dubble/hono/lib/types'
import { ConnectGoogleRoute } from './connect.routes'

export const connectGoogle: AppRouteHandler<ConnectGoogleRoute> = async (c) => {
  const { code, state } = c.req.query()

  if (!code) {
    return c.json({ error: 'No authorization code provided' }, 400)
  }
}
