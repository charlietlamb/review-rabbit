import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { invoices } from '@burse/database/schema/wh/invoices'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleInvoiceVoided = async (event: Stripe.Event) => {
  try {
    const invoice = event.data.object as Stripe.Invoice

    // Get the Stripe Connect account
    const stripeConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.id, event.account!),
    })

    if (!stripeConnect) {
      throw new Error(
        `No Stripe Connect account found for ID: ${event.account}`
      )
    }

    // Get the existing invoice to ensure it exists
    const existingInvoice = await db.query.invoices.findFirst({
      where: eq(invoices.stripeId, invoice.id),
    })

    if (!existingInvoice) {
      throw new Error(`No invoice found for ID: ${invoice.id}`)
    }

    // Update the invoice record to mark it as voided
    await db
      .update(invoices)
      .set({
        status: invoice.status ?? 'void',
        paid: false,
        voidedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(invoices.stripeId, invoice.id))
  } catch (error) {
    console.error('Error handling invoice.voided event:', error)
    throw error
  }
}
