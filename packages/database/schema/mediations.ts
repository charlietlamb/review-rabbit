import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { users } from './users'
import { relations } from 'drizzle-orm'
import { invoiceSchema } from './invoices'
import { clientSchema } from './clients'
import { mediationClients } from './mediation-clients'

export const mediations = pgTable('mediations', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  title: text('title').notNull(),
  notes: text('notes'),
  color: text('color').notNull(),
  date: timestamp('date').notNull(),
  duration: integer('duration').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const mediationsRelations = relations(mediations, ({ one, many }) => ({
  user: one(users, {
    fields: [mediations.userId],
    references: [users.id],
  }),
  mediationClients: many(mediationClients),
}))

export const mediationSchema = createSelectSchema(mediations)
export const insertMediationSchema = createInsertSchema(mediations)
export type Mediation = z.infer<typeof mediationSchema>
export type NewMediation = z.infer<typeof insertMediationSchema>

export const mediationWithDataSchema = mediationSchema.extend({
  data: z.array(
    z.object({
      client: clientSchema,
      invoice: invoiceSchema.nullable(),
      email: z.boolean(),
    })
  ),
})

export type MediationWithData = z.infer<typeof mediationWithDataSchema>
