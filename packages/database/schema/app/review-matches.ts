import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { reviews } from './reviews'
import { clients } from './clients'
import { users } from '../auth/users'

export const reviewMatches = pgTable('review_matches', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  reviewId: text('review_id')
    .notNull()
    .references(() => reviews.id),
  clientId: text('client_id')
    .notNull()
    .references(() => clients.id),
  matchScore: integer('match_score').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const reviewMatchSchema = createSelectSchema(reviewMatches)
export const insertReviewMatchSchema = createInsertSchema(reviewMatches)
export type ReviewMatch = z.infer<typeof reviewMatchSchema>
export type NewReviewMatch = z.infer<typeof insertReviewMatchSchema>
