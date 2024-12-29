import { pgTable, text, boolean, timestamp } from 'drizzle-orm/pg-core'
import { users } from '../auth/users'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const stripeConnects = pgTable('stripe_connects', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  title: text('title').notNull().default('Connected Account'),
  onboardingCompleted: boolean('onboardingCompleted').notNull().default(false),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  tokenType: text('token_type'),
  stripePublishableKey: text('stripe_publishable_key'),
  stripeUserId: text('stripe_user_id'),
  scope: text('scope'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const selectStripeConnectSchema = createSelectSchema(stripeConnects)
export const insertStripeConnectSchema = createInsertSchema(stripeConnects)
export type StripeConnect = z.infer<typeof selectStripeConnectSchema>
