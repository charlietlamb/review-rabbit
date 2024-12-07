import { pgTable, text, boolean } from 'drizzle-orm/pg-core'
import { users } from './users'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const stripeConnects = pgTable('stripe_connects', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
  onboardingCompleted: boolean('onboardingCompleted').notNull().default(false),
})

export const selectStripeConnectSchema = createSelectSchema(stripeConnects)
export const insertStripeConnectSchema = createInsertSchema(stripeConnects)
export type StripeConnect = z.infer<typeof selectStripeConnectSchema>
