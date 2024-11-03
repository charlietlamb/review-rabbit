// import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
// import { users } from './users'

// export const customers = pgTable('customers', {
//   id: varchar('id').primaryKey(),
//   userId: uuid('userId')
//     .notNull()
//     .references(() => users.id),
//   stripeCustomerId: varchar('stripeCustomerId').unique().notNull(),
//   email: varchar('email').notNull(),
//   name: varchar('name'),
//   createdAt: timestamp('createdAt').defaultNow().notNull(),
//   updatedAt: timestamp('updatedAt').defaultNow().notNull(),
// })
