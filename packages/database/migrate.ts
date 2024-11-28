import { migrate } from 'drizzle-orm/neon-http/migrator'
import { db } from './postgres'

migrate(db, { migrationsFolder: './migrations' }).then(async () => {})
