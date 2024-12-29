import * as schema from '@burse/database/schema'
import { Pool } from '@neondatabase/serverless'
import { getEnv } from '@burse/env'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { type NeonDatabase } from 'drizzle-orm/neon-serverless'

type Database = NeonDatabase<typeof schema>

let pool: Pool | null = null
let dbInstance: Database | null = null

function getPool() {
  if (!pool) {
    pool = new Pool({ connectionString: getEnv().DATABASE_URL })
  }
  return pool
}

function getDrizzle(): Database {
  if (!dbInstance) {
    dbInstance = drizzle(getPool(), { schema })
  }
  return dbInstance
}

export const db = new Proxy({} as Database, {
  get: (_target, prop: keyof Database) => {
    return getDrizzle()[prop]
  },
})
