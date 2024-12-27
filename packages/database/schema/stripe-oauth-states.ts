import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const stripeOAuthStates = pgTable('stripe_oauth_states', {
  state: text('state').primaryKey().notNull(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
})

export const selectStripeOAuthStateSchema =
  createSelectSchema(stripeOAuthStates)
export const insertStripeOAuthStateSchema =
  createInsertSchema(stripeOAuthStates)
export type StripeOAuthState = z.infer<typeof selectStripeOAuthStateSchema>
