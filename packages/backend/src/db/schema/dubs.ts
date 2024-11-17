import { timestamps } from './columns.helpers'
import { uuid, text, integer } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'
import { media } from './media'
import { users } from './users'
import { tasks } from './tasks'
import { sql } from 'drizzle-orm'

export const dubs = pgTable('dubs', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  taskId: uuid('task_id')
    .references(() => tasks.id)
    .notNull(),
  status: text('status').notNull().default('incomplete'),
  mediaId: uuid('media_id')
    .references(() => media.id)
    .notNull(),
  language: text('language').notNull(),
  dubbingId: text('dubbing_id').notNull(),
  dubUrl: text('dub_url').notNull(),
  ...timestamps,
})
