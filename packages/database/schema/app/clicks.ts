import { pgTable, timestamp, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import { sql } from 'drizzle-orm'
import { z } from 'zod'
import { businesses } from './businesses'
import { automationItems } from './automation-items'
import { businessSelectSchema } from '../../types/business-location-types'
import { automationItem } from '@rabbit/database/types/automation-types'

export const clicks = pgTable('clicks', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  businessId: text('business_id')
    .references(() => businesses.id)
    .notNull(),
  automationItemId: text('automation_item_id').references(
    () => automationItems.id
  ),
  method: text('method').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const clickRelations = relations(clicks, ({ one }) => ({
  business: one(businesses, {
    fields: [clicks.businessId],
    references: [businesses.id],
  }),
  automationItem: one(automationItems, {
    fields: [clicks.automationItemId],
    references: [automationItems.id],
  }),
}))

export const clickSelectSchema = createSelectSchema(clicks)

export type Click = z.infer<typeof clickSelectSchema>

export const clickWithDataSchema = clickSelectSchema.extend({
  automationItem: automationItem.nullable(),
  business: businessSelectSchema,
})

export type ClickWithData = z.infer<typeof clickWithDataSchema>
