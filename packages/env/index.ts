import { server, dbOnlyServer } from './server'
import { client, dbOnlyClient } from './client'
import { getDbEnv } from './get-db-env'
import { getMainEnv } from './get-main-env'
import { createEnv } from '@t3-oss/env-nextjs'

const cloudflareWorkerNotInitialized = Object.keys(process.env).length === 0

let dbOnlyEnv: ReturnType<
  typeof createEnv<typeof dbOnlyServer, typeof dbOnlyClient>
>

if (!cloudflareWorkerNotInitialized) {
  dbOnlyEnv = getDbEnv()
}

const databaseOnly =
  !cloudflareWorkerNotInitialized && process.env.DATABASE_ONLY === 'true'

let mainEnv: ReturnType<typeof createEnv<typeof server, typeof client>>

if (!databaseOnly && !cloudflareWorkerNotInitialized) {
  mainEnv = getMainEnv()
}

type EnvType = ReturnType<typeof createEnv<typeof server, typeof client>>

export function getEnv(): EnvType {
  // @ts-expect-error - This is a workaround to avoid type errors when using the env variable
  return process.env.DATABASE_ONLY === 'true'
    ? getDbEnv()
    : (getMainEnv() as ReturnType<
        typeof createEnv<typeof server, typeof client>
      >)
}

export { client, server }
