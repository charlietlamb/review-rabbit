import { AppOpenAPI } from '@rabbit/hono/lib/types'
import { getAuth } from '@rabbit/auth'

export default function configureBetterAuth(app: AppOpenAPI) {
  app.on(['POST', 'GET'], '/api/auth/**', (c) => {
    return getAuth(c.env).handler(c.req.raw)
  })
}
