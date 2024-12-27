import { AppOpenAPI } from '@burse/hono/lib/types'
import configureOpenAPI from '@burse/hono/lib/configure-open-api'
import configureBetterAuth from '@burse/hono/lib/configure-better-auth'
import configureAuth from '@burse/hono/lib/configure-auth'
import configureCors from '@burse/hono/lib/configure-cors'
import configureRedirects from '@burse/hono/lib/configure-redirects'

export default function configure(app: AppOpenAPI) {
  configureCors(app)
  configureAuth(app)
  configureBetterAuth(app)
  configureOpenAPI(app)
  configureRedirects(app)
}
