import { pgTable, timestamp, text } from 'drizzle-orm/pg-core'
import { users } from '../auth/users'
import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { locations } from './locations'

export const businesses = pgTable('businesses', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  name: text('name').notNull(),
  image: text('image'),
  email: text('email').notNull(),
  url: text('url').notNull(),
  phone: text('phone'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const businessesRelations = relations(businesses, ({ one, many }) => ({
  user: one(users, {
    fields: [businesses.userId],
    references: [users.id],
  }),
  locations: many(locations),
}))
