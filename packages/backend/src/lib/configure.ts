import { AppOpenAPI } from './types'
import configureOpenAPI from './configure-open-api'
import configureBetterAuth from './configure-better-auth'
import configureAuth from './configure-auth'

export default function configure(app: AppOpenAPI) {
  configureAuth(app)
  configureBetterAuth(app)
  configureOpenAPI(app)
}
