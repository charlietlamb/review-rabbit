import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const clients = pgTable('clients', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  color: text('color').notNull(),
  phoneNumber: text('phone_number'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const clientSchema = createSelectSchema(clients)
export const insertClientSchema = createInsertSchema(clients)
export type Client = z.infer<typeof clientSchema>
export type NewClient = z.infer<typeof insertClientSchema>
