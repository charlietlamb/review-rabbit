import { AppOpenAPI } from '@/src/lib/types'
import { auth } from '@/auth'

export default function configureBetterAuth(app: AppOpenAPI) {
  app.on(['POST', 'GET'], '/api/auth/**', (c) => {
    return auth.handler(c.req.raw)
  })
}
