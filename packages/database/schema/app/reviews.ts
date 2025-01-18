import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { businesses } from './businesses'
import { users } from '../auth/users'

export const reviews = pgTable('reviews', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  businessId: text('business_id')
    .notNull()
    .references(() => businesses.id),
  googleReviewId: text('google_review_id').notNull(),
  reviewerName: text('reviewer_name').notNull(),
  reviewerPhotoUrl: text('reviewer_photo_url'),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  replyComment: text('reply_comment'),
  replyTimestamp: timestamp('reply_timestamp'),
  reviewTimestamp: timestamp('review_timestamp').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const reviewSchema = createSelectSchema(reviews)
export const insertReviewSchema = createInsertSchema(reviews)
export type Review = z.infer<typeof reviewSchema>
export type NewReview = z.infer<typeof insertReviewSchema>
