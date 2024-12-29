import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { balanceTransactions } from '@burse/database/schema/wh/balance-transactions'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export const handleBalanceAvailable = async (event: Stripe.Event) => {
  const balance = event.data.object as Stripe.Balance

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  const now = new Date()

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  for (const available of balance.available) {
    const stripeId = `bal_${event.account}_${available.currency}_${now.getTime()}`

    await db.insert(balanceTransactions).values({
      id: uuidv4(),
      userId: stripeConnect.userId,
      stripeId,
      stripeConnectId: event.account!,
      amount: available.amount.toString(),
      currency: available.currency,
      type: 'balance',
      status: 'available',
      availableOn: now,
      metadata: {
        sourceTypes: available.source_types,
      },
    })
  }
}
