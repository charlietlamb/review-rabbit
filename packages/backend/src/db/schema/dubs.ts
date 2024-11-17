import { timestamps } from './columns.helpers'
import { uuid, text, integer } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'
import { media } from './media'
import { users } from './users'
import { tasks } from './tasks'

export const dubs = pgTable('dubs', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  taskId: uuid('task_id').references(() => tasks.id),
  status: text('status').notNull().default('incomplete'),
  mediaId: uuid('media_id').references(() => media.id),
  language: text('language'),
  tokens: integer('tokens').notNull().default(0),
  ...timestamps,
})
