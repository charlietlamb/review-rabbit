import { AppOpenAPI } from '@burse/hono/lib/types'
import { auth } from '@burse/auth'

export default function configureBetterAuth(app: AppOpenAPI) {
  app.on(['POST', 'GET'], '/api/auth/**', (c) => {
    return auth.handler(c.req.raw)
  })
}
