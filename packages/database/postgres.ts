import { env } from '@remio/env'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '@remio/database/schema'

const sql = neon(env.DATABASE_URL)
export const db = drizzle(sql, { schema })
