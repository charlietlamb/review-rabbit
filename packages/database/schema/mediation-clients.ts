import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { relations } from 'drizzle-orm'
import { mediations } from './mediations'
import { clients } from './clients'
import { invoices } from './invoices'

export const mediationClients = pgTable('mediation_clients', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  mediationId: text('mediation_id')
    .notNull()
    .references(() => mediations.id),
  clientId: text('client_id')
    .notNull()
    .references(() => clients.id),
  invoiceId: text('invoice_id').references(() => invoices.id),
  email: boolean('email').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const mediationClientsRelations = relations(
  mediationClients,
  ({ one }) => ({
    mediation: one(mediations, {
      fields: [mediationClients.mediationId],
      references: [mediations.id],
    }),
    client: one(clients, {
      fields: [mediationClients.clientId],
      references: [clients.id],
    }),
    invoice: one(invoices, {
      fields: [mediationClients.invoiceId],
      references: [invoices.id],
    }),
  })
)

export const mediationClientSchema = createSelectSchema(mediationClients)
export const insertMediationClientSchema = createInsertSchema(mediationClients)
export type MediationClient = z.infer<typeof mediationClientSchema>
export type NewMediationClient = z.infer<typeof insertMediationClientSchema>
