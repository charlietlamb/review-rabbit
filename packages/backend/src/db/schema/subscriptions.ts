// import {
//   integer,
//   pgTable,
//   timestamp,
//   varchar,
//   boolean,
// } from 'drizzle-orm/pg-core'
// import { customers } from './customers'

// export const subscriptions = pgTable('subscriptions', {
//   id: varchar('id').primaryKey(),
//   customerId: varchar('customer_id')
//     .references(() => customers.id)
//     .notNull(),
//   stripeSubscriptionId: varchar('stripe_subscription_id').unique().notNull(),
//   status: varchar('status').notNull(),
//   priceId: varchar('priceId').notNull(),
//   quantity: integer('quantity').notNull(),
//   cancelAtPeriodEnd: boolean('cancelAtPeriodEnd').notNull().default(false),
//   cancelAt: timestamp('cancelAt'),
//   canceledAt: timestamp('canceledAt'),
//   currentPeriodStart: timestamp('currentPeriodStart').notNull(),
//   currentPeriodEnd: timestamp('currentPeriodEnd').notNull(),
//   endedAt: timestamp('endedAt'),
//   trialStart: timestamp('trialStart'),
//   trialEnd: timestamp('trialEnd'),
//   createdAt: timestamp('createdAt').defaultNow().notNull(),
//   updatedAt: timestamp('updatedAt').defaultNow().notNull(),
// })
