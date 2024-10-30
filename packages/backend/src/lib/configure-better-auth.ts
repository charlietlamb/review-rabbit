import { AppOpenAPI } from '@/src/lib/types'
import { auth as betterAuth } from '@/auth'

export default function configureBetterAuth(app: AppOpenAPI) {
  app.get('/api/auth/*', (c) => betterAuth.handler(c.req.raw))
  app.post('/api/auth/*', (c) => betterAuth.handler(c.req.raw))
}
