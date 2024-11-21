import { AppOpenAPI } from '@dubble/hono/lib/types'
import configureOpenAPI from '@dubble/hono/lib/configure-open-api'
import configureBetterAuth from '@dubble/hono/lib/configure-better-auth'
import configureAuth from '@dubble/hono/lib/configure-auth'
import configureCors from '@dubble/hono/lib/configure-cors'
import configureStripe from '@dubble/hono/lib/configure-stripe'
import configureRedirects from '@dubble/hono/lib/configure-redirects'

export default function configure(app: AppOpenAPI) {
  configureCors(app)
  configureAuth(app)
  configureBetterAuth(app)
  configureOpenAPI(app)
  configureStripe(app)
  configureRedirects(app)
}
