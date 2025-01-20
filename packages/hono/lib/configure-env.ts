import { AppBindings, AppOpenAPI } from '@rabbit/hono/lib/types'
import { createMiddleware } from 'hono/factory'
import { Env, setupEnv } from '@rabbit/hono/lib/setup-env'

export const envMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  console.log('envMiddleware', c.env)
  setupEnv(c.env as Env)
  return next()
})

export default function configureEnv(app: AppOpenAPI) {
  app.use('*', envMiddleware)
}
