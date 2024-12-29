import { pgTable, timestamp, jsonb } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const paymentIntents = pgTable('wh_payment_intents', {
  paidAt: timestamp('paidAt'),
  lastPaymentError: jsonb('lastPaymentError').default('{}'),
})

export async function up(db: any): Promise<void> {
  await db.schema
    .alterTable('wh_payment_intents')
    .addColumn('paidAt', timestamp('paidAt'))
  await db.schema
    .alterTable('wh_payment_intents')
    .addColumn('lastPaymentError', jsonb('lastPaymentError').default('{}'))
}

export async function down(db: any): Promise<void> {
  await db.schema.alterTable('wh_payment_intents').dropColumn('paidAt')
  await db.schema
    .alterTable('wh_payment_intents')
    .dropColumn('lastPaymentError')
}
