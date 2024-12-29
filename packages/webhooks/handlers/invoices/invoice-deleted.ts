import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { invoices } from '@burse/database/schema/wh/invoices'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleInvoiceDeleted = async (event: Stripe.Event) => {
  const invoice = event.data.object as Stripe.Invoice

  // Get the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // For deleted invoices, we'll keep the record but mark it as deleted
  await db
    .update(invoices)
    .set({
      status: 'deleted',
      updatedAt: new Date(),
    })
    .where(eq(invoices.stripeId, invoice.id))
}
