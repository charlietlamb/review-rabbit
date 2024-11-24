import { env } from '@dubble/env'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '@dubble/database/schema'

// Replace postgresql:// with postgres:// for Neon serverless
const CONNECTION_STRING = env.DATABASE_URL.replace(
  'postgresql://',
  'postgres://'
)

const sql = neon(CONNECTION_STRING)
export const db = drizzle(sql, { schema })
