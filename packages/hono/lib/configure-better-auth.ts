import { AppOpenAPI } from '@dubble/hono/lib/types'
import { auth } from '@dubble/auth'

export default function configureBetterAuth(app: AppOpenAPI) {
  app.on(['POST', 'GET'], '/api/auth/**', (c) => {
    return auth.handler(c.req.raw)
  })
}
