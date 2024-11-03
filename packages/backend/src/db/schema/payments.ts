// import {
//   pgTable,
//   timestamp,
//   varchar,
//   decimal,
//   pgEnum,
// } from 'drizzle-orm/pg-core'
// import { customers } from './customers'
// import { subscriptions } from './subscriptions'

// const status = pgEnum('status', ['succeeded', 'failed', 'processing'])

// export const payments = pgTable('payments', {
//   id: varchar('id').primaryKey(),
//   stripePaymentIntentId: varchar('stripePaymentIntentId').unique().notNull(),
//   customerId: varchar('customerId')
//     .references(() => customers.id)
//     .notNull(),
//   subscriptionId: varchar('subscriptionId')
//     .references(() => subscriptions.id)
//     .notNull(),
//   amount: decimal('amount', { precision: 32, scale: 2 }).notNull(),
//   currency: varchar('currency').notNull(),
//   status: status('status').notNull(),
//   paymentMethod: varchar('paymentMethod').notNull(),
//   receiptEmail: varchar('receiptEmail'),
//   receiptUrl: varchar('receiptUrl'),
//   failureMessage: varchar('failureMessage'),
//   createdAt: timestamp('createdAt').defaultNow().notNull(),
//   updatedAt: timestamp('updatedAt').defaultNow().notNull(),
// })
