import { server } from './server'
import { client } from './client'
import { dbEnv } from './get-db-env'
import { env as mainEnv } from './get-main-env'
import { createEnv } from '@t3-oss/env-nextjs'

export type EnvType = ReturnType<typeof createEnv<typeof server, typeof client>>

const databaseOnly = process.env.DATABASE_ONLY === 'true'

// @ts-expect-error - This is a workaround to avoid type errors when using the env variable
export const env: EnvType = databaseOnly ? dbEnv : mainEnv

export { client, server }
