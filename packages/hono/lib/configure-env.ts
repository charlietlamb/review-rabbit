import { AppOpenAPI } from '@rabbit/hono/lib/types'
import { mainEnvSchema } from '@rabbit/env/main-env-schema'

export function parseEnv(data: any) {
  const { data: env, error } = mainEnvSchema.safeParse(data)

  if (error) {
    const errorMessage = `❌ Invalid env - ${Object.entries(
      error.flatten().fieldErrors
    )
      .map(([key, errors]) => `${key}: ${errors.join(',')}`)
      .join(' | ')}`
    throw new Error(errorMessage)
  }

  return env
}

export default function configureEnv(app: AppOpenAPI) {
  app.use('*', async (c, next) => {
    parseEnv(c.env)
    return next()
  })
}
