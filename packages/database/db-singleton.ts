import * as schema from '@rabbit/database/schema'
import { Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { env } from '@rabbit/env'

const pool = new Pool({ connectionString: env.DATABASE_URL })
export const dbSingleton = drizzle(pool, { schema })
