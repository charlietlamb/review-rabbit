import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { clients, clientSchema } from './clients'
import { users } from './users'
import { relations } from 'drizzle-orm'

export const emails = pgTable('emails', {
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
  subject: text('subject').notNull(),
  body: text('body').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const emailsRelations = relations(emails, ({ one }) => ({
  user: one(users, {
    fields: [emails.userId],
    references: [users.id],
  }),
  client: one(clients, {
    fields: [emails.clientId],
    references: [clients.id],
  }),
}))

export const emailSchema = createSelectSchema(emails)
export const insertEmailSchema = createInsertSchema(emails)
export type Email = z.infer<typeof emailSchema>
export type NewEmail = z.infer<typeof insertEmailSchema>

export const emailWithClientSchema = emailSchema.extend({
  client: clientSchema,
})
export type EmailWithClient = z.infer<typeof emailWithClientSchema>
