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
// @ts-expect-error - This is a workaround to avoid type errors when using the env variable
export const env: EnvType = !databaseOnly ? mainEnv : dbOnlyEnv

export function getEnv() {
  return getMainEnv() as ReturnType<
    typeof createEnv<typeof server, typeof client>
  >
}

export { client, server }
