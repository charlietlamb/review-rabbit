import { AppOpenAPI } from '@ff/hono/lib/types'
import configureOpenAPI from '@ff/hono/lib/configure-open-api'
import configureBetterAuth from '@ff/hono/lib/configure-better-auth'
import configureAuth from '@ff/hono/lib/configure-auth'
import configureCors from '@ff/hono/lib/configure-cors'
import configureStripe from '@ff/hono/lib/configure-stripe'
import configureRedirects from '@ff/hono/lib/configure-redirects'

export default function configure(app: AppOpenAPI) {
  configureCors(app)
  configureAuth(app)
  configureBetterAuth(app)
  configureOpenAPI(app)
  configureStripe(app)
  configureRedirects(app)
}
