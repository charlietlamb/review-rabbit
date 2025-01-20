import * as schema from '@rabbit/database/schema'
import { Pool } from '@neondatabase/serverless'
import { type EnvType } from '@rabbit/env'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { type NeonDatabase } from 'drizzle-orm/neon-serverless'

type Database = NeonDatabase<typeof schema>

let pool: Pool | null = null
let dbInstance: Database | null = null

function getPool(env: EnvType) {
  if (!pool) {
    pool = new Pool({ connectionString: env.DATABASE_URL })
  }
  return pool
}

function getDrizzle(env: EnvType): Database {
  if (!dbInstance) {
    dbInstance = drizzle(getPool(env), { schema })
  }
  return dbInstance
}

export function getDb(env: EnvType): Database {
  return getDrizzle(env)
}
