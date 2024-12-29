import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { invoices } from '@burse/database/schema/wh/invoices'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { customers } from '@burse/database/schema/wh/customers'
import { eq } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export const handleInvoiceCreated = async (event: Stripe.Event) => {
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

    // Get the customer record
    const customer = await db.query.customers.findFirst({
      where: eq(customers.stripeId, invoice.customer as string),
    })

    if (!customer) {
      throw new Error(`No customer found for ID: ${invoice.customer}`)
    }

    // Check if invoice already exists
    const existingInvoice = await db.query.invoices.findFirst({
      where: eq(invoices.stripeId, invoice.id),
    })

    if (existingInvoice) {
      throw new Error(`Invoice already exists with ID: ${invoice.id}`)
    }

    // Create the invoice record
    await db.insert(invoices).values({
      id: uuidv4(),
      userId: stripeConnect.userId,
      stripeId: invoice.id,
      customerId: customer.id,
      subscriptionId: invoice.subscription as string | null,
      status: invoice.status ?? 'draft',
      currency: invoice.currency,
      amountDue: sql`${invoice.amount_due / 100}::decimal`,
      amountPaid: sql`${invoice.amount_paid / 100}::decimal`,
      amountRemaining: sql`${invoice.amount_remaining / 100}::decimal`,
      subtotal: sql`${invoice.subtotal / 100}::decimal`,
      total: sql`${invoice.total / 100}::decimal`,
      tax: invoice.tax ? sql`${invoice.tax / 100}::decimal` : null,
      billingReason: invoice.billing_reason,
      collectionMethod: invoice.collection_method,
      description: invoice.description,
      dueDate: invoice.due_date ? new Date(invoice.due_date * 1000) : null,
      paid: invoice.paid,
      periodStart: new Date(invoice.period_start * 1000),
      periodEnd: new Date(invoice.period_end * 1000),
      receiptNumber: invoice.receipt_number,
      statementDescriptor: invoice.statement_descriptor,
      metadata: invoice.metadata ?? {},
    })
  } catch (error) {
    console.error('Error handling invoice.created event:', error)
    throw error
  }
}
