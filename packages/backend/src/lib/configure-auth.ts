import { AppBindings, AppOpenAPI } from '@/src/lib/types'
import { createMiddleware } from 'hono/factory'
import { auth } from '@/auth'
import { HttpStatusCodes } from '../http'
import { jsonContent } from 'stoker/openapi/helpers'
import { z } from 'zod'

export const authMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  if (!session) {
    c.set('user', null)
    c.set('session', null)
    return next()
  }

  c.set('user', session.user)
  c.set('session', session.session)
  return next()
})

export default function configureAuth(app: AppOpenAPI) {
  app.use('*', authMiddleware)
}

export const unauthorizedSchema = {
  [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
    z.object({ error: z.string() }),
    'Unauthorized'
  ),
}
