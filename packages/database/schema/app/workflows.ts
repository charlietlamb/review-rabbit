import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { workflowItems } from './workflow-items'
import { relations } from 'drizzle-orm'
import { users } from '../auth/users'

export const workflows = pgTable('workflows', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  title: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const workflowRelations = relations(workflows, ({ many, one }) => ({
  items: many(workflowItems),
  user: one(users, {
    fields: [workflows.userId],
    references: [users.id],
  }),
}))
