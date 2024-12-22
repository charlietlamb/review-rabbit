'use server'

import { InvoiceWithClient } from '@remio/database'
import { stripe } from '@remio/stripe'
import { env } from '@remio/env'

export default async function getInvoicePaymentLink(
  invoice: InvoiceWithClient
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: invoice.currency,
            product_data: {
              name: `Invoice #${invoice.id}`,
              description:
                invoice.reference || `Invoice for ${invoice.client.name}`,
            },
            unit_amount: Number(invoice.amount) * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${env.NEXT_PUBLIC_WEB}/dashboard/invoice/${invoice.id}?payment_success=true`,
      cancel_url: `${env.NEXT_PUBLIC_WEB}/dashboard/invoice/${invoice.id}?payment_canceled=true`,
      client_reference_id: invoice.id,
      customer_email: invoice.client.email,
      metadata: {
        invoiceId: invoice.id,
        clientId: invoice.clientId,
        userId: invoice.userId,
      },
    })

    if (!session.url) throw new Error('Failed to create payment session')
    return session.url
  } catch (error) {
    console.error('Error creating payment link:', error)
    throw error
  }
}
