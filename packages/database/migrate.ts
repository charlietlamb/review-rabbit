import { migrate } from 'drizzle-orm/neon-http/migrator'
import { getDb } from './postgres'
import { env } from '@rabbit/env'

migrate(getDb(env), { migrationsFolder: './migrations' }).then(async () => {})
