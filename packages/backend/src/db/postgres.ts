import env from '../env'
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import * as schema from './schema'

declare global {
  var db: PostgresJsDatabase<typeof schema> | undefined
}

let db: PostgresJsDatabase<typeof schema>

if (env.NODE_ENV === 'production') {
  db = drizzle(env.DATABASE_URL ?? 'undefined-db-url', { schema })
} else {
  if (!global.db)
    global.db = drizzle(env.DATABASE_URL ?? 'undefined-db-url', { schema })
  db = global.db
}

export { db }
