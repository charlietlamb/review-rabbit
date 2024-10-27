import { timestamp, pgTable, text, uuid, boolean } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { timestamps } from './columns.helpers'

export const users = pgTable('user', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  imageUploaded: boolean('imageUploaded').default(false),
  ...timestamps,
})

export const selectUserSchema = createSelectSchema(users)
export const insertUserSchema = createInsertSchema(users)
