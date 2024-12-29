import { pgTable, timestamp, text } from 'drizzle-orm/pg-core'
import { selectStripeConnectSchema, stripeConnects } from './stripe-connects'
import { users } from '../auth/users'
import { relations } from 'drizzle-orm'
import { selectStripePriceSchema, stripePrices } from './stripe-prices'
import { createInsertSchema } from 'drizzle-zod'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const stripeProducts = pgTable('stripe_products', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  stripeConnectId: text('stripe_connect_id')
    .references(() => stripeConnects.id)
    .notNull(),
  title: text('title').notNull(),
  stripeProductId: text('stripe_product_id').notNull(),
  stripeTestProductId: text('stripe_test_product_id').notNull(),
  taxCode: text('tax_code'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const stripeProductsRelations = relations(
  stripeProducts,
  ({ one, many }) => ({
    stripeConnect: one(stripeConnects, {
      fields: [stripeProducts.stripeConnectId],
      references: [stripeConnects.id],
    }),
    prices: many(stripePrices),
  })
)

export const selectStripeProductSchema = createSelectSchema(stripeProducts)
export const insertStripeProductSchema = createInsertSchema(stripeProducts)

export type StripeProduct = typeof stripeProducts.$inferSelect

export const selectStripeProductWithDataSchema =
  selectStripeProductSchema.extend({
    stripeConnect: selectStripeConnectSchema,
    prices: z.array(selectStripePriceSchema),
  })

export type StripeProductWithData = z.infer<
  typeof selectStripeProductWithDataSchema
>
