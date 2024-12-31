import { AppOpenAPI } from '@rabbit/hono/lib/types'
import configureOpenAPI from '@rabbit/hono/lib/configure-open-api'
import configureBetterAuth from '@rabbit/hono/lib/configure-better-auth'
import configureAuth from '@rabbit/hono/lib/configure-auth'
import configureCors from '@rabbit/hono/lib/configure-cors'
import configureRedirects from '@rabbit/hono/lib/configure-redirects'

export default function configure(app: AppOpenAPI) {
  configureCors(app)
  configureAuth(app)
  configureBetterAuth(app)
  configureOpenAPI(app)
  configureRedirects(app)
}
