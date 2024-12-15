import * as schema from '@remio/database/schema'
import { Pool } from '@neondatabase/serverless'
import { env } from '@remio/env'
import { drizzle } from 'drizzle-orm/neon-serverless'

const pool = new Pool({ connectionString: env.DATABASE_URL })
export const db = drizzle({ client: pool, schema })
