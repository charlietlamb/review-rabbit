import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { stripeProducts } from './stripe-products'
import { relations } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import { createInsertSchema } from 'drizzle-zod'

export const stripePrices = pgTable('stripe_prices', {
  id: text('id').primaryKey(),
  stripeProductId: text('stripe_product_id').references(
    () => stripeProducts.id,
    { onDelete: 'cascade' }
  ),
  stripePriceId: text('stripe_price_id'),
  stripeTestPriceId: text('stripe_test_price_id'),
  title: text('title').notNull(),
  amount: integer('amount'),
  currency: text('currency').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const stripePricesRelations = relations(stripePrices, ({ one }) => ({
  stripeProduct: one(stripeProducts, {
    fields: [stripePrices.stripeProductId],
    references: [stripeProducts.id],
  }),
}))

export const selectStripePriceSchema = createSelectSchema(stripePrices)
export const insertStripePriceSchema = createInsertSchema(stripePrices)

export type StripePrice = typeof stripePrices.$inferSelect
