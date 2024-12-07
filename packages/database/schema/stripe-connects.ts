import { pgTable, text } from 'drizzle-orm/pg-core'
import { users } from './users'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const stripeConnects = pgTable('stripe_connects', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId')
    .references(() => users.id)
    .notNull(),
})

export const selectStripeConnectSchema = createSelectSchema(stripeConnects)
export const insertStripeConnectSchema = createInsertSchema(stripeConnects)
export type SelectStripeConnectSchema = z.infer<
  typeof selectStripeConnectSchema
>
