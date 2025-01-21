import * as schema from '@rabbit/database/schema'
import { Pool } from '@neondatabase/serverless'
import { type EnvType } from '@rabbit/env'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { type NeonDatabase } from 'drizzle-orm/neon-serverless'

type Database = NeonDatabase<typeof schema>

export function getDb(env: EnvType): Database {
  const pool = new Pool({ connectionString: env.DATABASE_URL })
  return drizzle(pool, { schema })
}
