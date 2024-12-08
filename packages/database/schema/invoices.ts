import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, decimal, boolean } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { clients } from './clients'
import { users } from './users'

export const invoices = pgTable('invoices', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  clientId: text('client_id')
    .notNull()
    .references(() => clients.id),
  paid: boolean('paid').notNull().default(false),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('GBP'),
  dueDate: timestamp('due_date').notNull(),
  issueDate: timestamp('issue_date').notNull(),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const invoiceSchema = createSelectSchema(invoices)
export const insertInvoiceSchema = createInsertSchema(invoices)
export type Invoice = z.infer<typeof invoiceSchema>
export type NewInvoice = z.infer<typeof insertInvoiceSchema>
