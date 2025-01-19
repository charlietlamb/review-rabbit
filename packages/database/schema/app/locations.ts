import { pgTable, timestamp, text } from 'drizzle-orm/pg-core'
import { users } from '../auth/users'
import { relations } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import { sql } from 'drizzle-orm'
import { z } from 'zod'
import { businesses } from './businesses'

export const locations = pgTable('locations', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  businessId: text('business_id')
    .references(() => businesses.id)
    .notNull(),
  name: text('name').notNull(),
  image: text('image'),
  url: text('url').notNull(),
  phone: text('phone'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const locationsRelations = relations(locations, ({ one }) => ({
  user: one(users, {
    fields: [locations.userId],
    references: [users.id],
  }),
  business: one(businesses, {
    fields: [locations.businessId],
    references: [businesses.id],
  }),
}))

export const locationSelectSchema = createSelectSchema(locations)

export type Location = z.infer<typeof locationSelectSchema>

export const locationFormSchema = locationSelectSchema.pick({
  name: true,
  url: true,
  phone: true,
  image: true,
})

export type LocationForm = z.infer<typeof locationFormSchema>

export const locationFormWithIdSchema = locationFormSchema.extend({
  id: z.string(),
})

export type LocationFormWithId = z.infer<typeof locationFormWithIdSchema>
