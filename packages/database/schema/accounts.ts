import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from '@remio/database/schema/users'
import { sql } from 'drizzle-orm'

export const accounts = pgTable('accounts', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  expiresAt: timestamp('expiresAt'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})
