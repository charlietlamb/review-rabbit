import { AppBindings, AppOpenAPI } from '@/src/lib/types'
import { createMiddleware } from 'hono/factory'
import getUserFromJwt from '@/src/actions/auth/get-user-from-jwt'
import { User } from '../db/schema/users'
import { StatusCode } from 'hono/utils/http-status'

export const authMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  const body = await c.req.json()
  const response = await getUserFromJwt(body.session, c)
  if ('error' in response) {
    return c.json(response.error, response.code as StatusCode)
  } else {
    c.set('user', response as User)
    await next()
  }
})

export default function configureAuth(app: AppOpenAPI) {
  app.use('/auth/*', authMiddleware)
}
