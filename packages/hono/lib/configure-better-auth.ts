import { AppOpenAPI } from '@remio/hono/lib/types'
import { auth } from '@remio/auth'

export default function configureBetterAuth(app: AppOpenAPI) {
  app.on(['POST', 'GET'], '/api/auth/**', (c) => {
    return auth.handler(c.req.raw)
  })
}
