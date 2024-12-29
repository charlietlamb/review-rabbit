import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { invoices } from '@burse/database/schema/wh/invoices'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleInvoicePaymentActionRequired = async (
  event: Stripe.Event
) => {
  const invoice = event.data.object as Stripe.Invoice

  // Get the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Update the invoice record to indicate payment action is required
  await db
    .update(invoices)
    .set({
      status: invoice.status ?? 'requires_action',
      requiresAction: true,
      updatedAt: new Date(),
    })
    .where(eq(invoices.stripeId, invoice.id))
}