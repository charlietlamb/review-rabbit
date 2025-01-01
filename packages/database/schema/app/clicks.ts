import { pgTable, timestamp, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import { sql } from 'drizzle-orm'
import { z } from 'zod'
import { businesses } from './businesses'

export const clicks = pgTable('clicks', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  businessId: text('business_id')
    .references(() => businesses.id)
    .notNull(),
  method: text('method').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const clickRelations = relations(clicks, ({ one }) => ({
  business: one(businesses, {
    fields: [clicks.businessId],
    references: [businesses.id],
  }),
}))

export const clickSelectSchema = createSelectSchema(clicks)

export type Click = z.infer<typeof clickSelectSchema>
