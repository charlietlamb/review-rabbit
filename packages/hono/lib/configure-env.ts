import { AppOpenAPI } from '@rabbit/hono/lib/types'
import { mainEnvSchema } from '@rabbit/env/get-main-env'

export default function configureCors(app: AppOpenAPI) {
  app.use('*', async (c, next) => {
    try {
      mainEnvSchema.parse(c.env)
      return next()
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Invalid environment variables: ${error.message}`)
      }
      throw new Error('Invalid environment variables: Unknown error')
    }
  })
}
