import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { invoices } from '@burse/database/schema/wh/invoices'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

export const handleInvoicePaymentFailed = async (event: Stripe.Event) => {
  try {
    const invoice = event.data.object as Stripe.Invoice
    const lastError = event.data.object as {
      last_payment_error?: Stripe.PaymentIntent.LastPaymentError
    }

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

    // Update the invoice record with failure details
    await db
      .update(invoices)
      .set({
        status: invoice.status ?? 'payment_failed',
        amountPaid: sql`${invoice.amount_paid / 100}::decimal`,
        amountRemaining: sql`${invoice.amount_remaining / 100}::decimal`,
        paid: false,
        lastPaymentError: lastError.last_payment_error
          ? {
              message: lastError.last_payment_error.message,
              code: lastError.last_payment_error.code,
              type: lastError.last_payment_error.type,
            }
          : {},
        nextPaymentAttempt: invoice.next_payment_attempt
          ? new Date(invoice.next_payment_attempt * 1000)
          : null,
        updatedAt: new Date(),
      })
      .where(eq(invoices.stripeId, invoice.id))
  } catch (error) {
    console.error('Error handling invoice.payment_failed event:', error)
    throw error
  }
}
