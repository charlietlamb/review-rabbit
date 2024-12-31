import { pgTable, timestamp, text } from 'drizzle-orm/pg-core'
import { users } from '../auth/users'
import { relations } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import { sql } from 'drizzle-orm'
import { z } from 'zod'
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
  phone: text('phone'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const businessesRelations = relations(businesses, ({ one }) => ({
  user: one(users, {
    fields: [businesses.userId],
    references: [users.id],
  }),
}))

export const businessSelectSchema = createSelectSchema(businesses)

export type Business = z.infer<typeof businessSelectSchema>

export const businessFormSchema = businessSelectSchema.pick({
  name: true,
  email: true,
  phone: true,
  image: true,
})

export type BusinessForm = z.infer<typeof businessFormSchema>

export const businessFormWithIdSchema = businessFormSchema.extend({
  id: z.string(),
})

export type BusinessFormWithId = z.infer<typeof businessFormWithIdSchema>
