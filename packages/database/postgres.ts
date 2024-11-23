import { env } from '@dubble/env'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '@dubble/database/schema'

export const db = drizzle(env.DATABASE_URL, { schema })
