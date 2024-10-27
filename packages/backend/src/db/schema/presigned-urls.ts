import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from './users'
import { timestamps } from './columns.helpers'

export const presignedUrls = pgTable('presignedUrl', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  url: text('url').notNull(),
  ...timestamps,
})
