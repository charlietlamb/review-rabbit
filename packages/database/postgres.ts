import { env } from '@dubble/env'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from '@dubble/database/schema'

const sql = neon(env.DATABASE_URL)
export const db = drizzle({ client: sql }, { schema })
