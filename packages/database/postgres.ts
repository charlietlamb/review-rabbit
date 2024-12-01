import { env } from '@ff/env'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '@ff/database/schema'

const sql = neon(env.DATABASE_URL)
export const db = drizzle(sql, { schema })
