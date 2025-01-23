import { AppOpenAPI } from '@rabbit/hono/lib/types'
import { getAuth } from '@rabbit/auth'

export default function configureBetterAuth(app: AppOpenAPI) {
  app.on(['POST', 'GET'], '/api/auth/**', (c) => {
    const auth = getAuth(c.env)
    return auth.handler(c.req.raw)
  })
}
