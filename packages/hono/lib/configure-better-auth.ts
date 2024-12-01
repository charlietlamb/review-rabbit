import { AppOpenAPI } from '@ff/hono/lib/types'
import { auth } from '@ff/auth'

export default function configureBetterAuth(app: AppOpenAPI) {
  app.on(['POST', 'GET'], '/api/auth/**', (c) => {
    return auth.handler(c.req.raw)
  })
}
