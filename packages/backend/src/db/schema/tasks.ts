import { timestamps } from './columns.helpers'
import { uuid, text, integer } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'
import { users } from './users'
import { sql } from 'drizzle-orm'

export const tasks = pgTable('tasks', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id),
  tokens: integer('tokens').notNull().default(0),
  status: text('status').notNull().default('incomplete'),
  ...timestamps,
})
