import { server } from './server'
import { client } from './client'
import { getDbEnv } from './get-db-env'
import { getMainEnv } from './get-main-env'
import { createEnv } from '@t3-oss/env-nextjs'

const cloudflareWorkerNotInitialized = Object.keys(process.env).length === 0

type EnvType = ReturnType<typeof createEnv<typeof server, typeof client>>

const databaseOnly =
  !cloudflareWorkerNotInitialized && process.env.DATABASE_ONLY === 'true'

export function getEnv(): EnvType {
  // @ts-expect-error - This is a workaround to avoid type errors when using the env variable
  return databaseOnly
    ? getDbEnv()
    : (getMainEnv() as ReturnType<
        typeof createEnv<typeof server, typeof client>
      >)
}

if (!cloudflareWorkerNotInitialized) {
  if (databaseOnly) {
    getDbEnv()
  } else {
    getMainEnv()
  }
}

export { client, server }
