import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const events = pgTable('events', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => sql`gen_random_uuid()`)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  type: text('type').notNull(),
  text: text('text').notNull(),
})
