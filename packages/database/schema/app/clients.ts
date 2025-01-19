import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { relations } from 'drizzle-orm'
import { reviewMatches, reviewMatchSchema } from './review-matches'
import { users } from '../auth/users'
import { businesses } from './businesses'
import { locations } from './locations'
import { businessSelectSchema } from '@rabbit/database/types/business-location-types'
import { locationSelectSchema } from '@rabbit/database/types/business-location-types'

export const clients = pgTable('clients', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  userId: text('user_id').notNull(),
  businessId: text('business_id')
    .references(() => businesses.id)
    .notNull(),
  locationId: text('location_id')
    .references(() => locations.id)
    .notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  color: text('color').notNull(),
  phone: text('phone'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const clientSchema = createSelectSchema(clients)
export const insertClientSchema = createInsertSchema(clients)
export type Client = z.infer<typeof clientSchema>
export type NewClient = z.infer<typeof insertClientSchema>

export const clientWithReviewMatches = clientSchema.extend({
  reviewMatches: z.array(reviewMatchSchema),
  business: businessSelectSchema,
  location: locationSelectSchema,
})

export type ClientWithData = z.infer<typeof clientWithReviewMatches>

export const clientsRelations = relations(clients, ({ one, many }) => ({
  user: one(users, { references: [users.id], fields: [clients.userId] }),
  business: one(businesses, {
    references: [businesses.id],
    fields: [clients.businessId],
  }),
  location: one(locations, {
    references: [locations.id],
    fields: [clients.locationId],
  }),
  reviewMatches: many(reviewMatches),
}))
