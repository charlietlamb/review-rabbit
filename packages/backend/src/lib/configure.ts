import { AppOpenAPI } from './types'
import configureOpenAPI from './configure-open-api'
import configureBetterAuth from './configure-better-auth'
import configureAuth from './configure-auth'
import configureCors from './configure-cors'
import configureStripe from './configure-stripe'

export default function configure(app: AppOpenAPI) {
  configureCors(app)
  configureAuth(app)
  configureBetterAuth(app)
  configureOpenAPI(app)
  configureStripe(app)
}
