import { AppOpenAPI } from '@remio/hono/lib/types'
import configureOpenAPI from '@remio/hono/lib/configure-open-api'
import configureBetterAuth from '@remio/hono/lib/configure-better-auth'
import configureAuth from '@remio/hono/lib/configure-auth'
import configureCors from '@remio/hono/lib/configure-cors'
import configureStripe from '@remio/hono/lib/configure-stripe'
import configureRedirects from '@remio/hono/lib/configure-redirects'

export default function configure(app: AppOpenAPI) {
  configureCors(app)
  configureAuth(app)
  configureBetterAuth(app)
  configureOpenAPI(app)
  configureStripe(app)
  configureRedirects(app)
}
