import * as schema from '@burse/database/schema'
import { Pool } from '@neondatabase/serverless'
import { env } from '@burse/env'
import { drizzle } from 'drizzle-orm/neon-serverless'

const pool = new Pool({ connectionString: env.DATABASE_URL })
export const db = drizzle({ client: pool, schema })
