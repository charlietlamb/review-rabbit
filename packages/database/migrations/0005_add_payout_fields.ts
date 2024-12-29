import { pgTable, timestamp } from 'drizzle-orm/pg-core'

export const payouts = pgTable('wh_payouts', {
  paidAt: timestamp('paidAt'),
  canceledAt: timestamp('canceledAt'),
})

export async function up(db: any): Promise<void> {
  await db.schema
    .alterTable('wh_payouts')
    .addColumn('paidAt', timestamp('paidAt'))
  await db.schema
    .alterTable('wh_payouts')
    .addColumn('canceledAt', timestamp('canceledAt'))
}

export async function down(db: any): Promise<void> {
  await db.schema.alterTable('wh_payouts').dropColumn('paidAt')
  await db.schema.alterTable('wh_payouts').dropColumn('canceledAt')
}
