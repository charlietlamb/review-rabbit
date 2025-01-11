import { AppOpenAPI } from '@rabbit/hono/lib/types'
import { auth } from '@rabbit/auth'

export default function configureBetterAuth(app: AppOpenAPI) {
  app.on(['POST', 'GET'], '/api/auth/**', (c) => {
    console.log('/*calling handler*/')
    return auth.handler(c.req.raw)
  })
}
