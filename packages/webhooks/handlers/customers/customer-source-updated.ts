import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { customerPaymentMethods } from '@burse/database/schema/wh/customer-payment-methods'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleCustomerSourceUpdated = async (event: Stripe.Event) => {
  const source = event.data.object as Stripe.Card

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Update the payment method record
  await db
    .update(customerPaymentMethods)
    .set({
      billingDetails: {
        name: source.name,
      },
      card: {
        brand: source.brand,
        country: source.country,
        exp_month: source.exp_month,
        exp_year: source.exp_year,
        last4: source.last4,
        funding: source.funding,
      },
      metadata: source.metadata ?? {},
      updatedAt: new Date(),
    })
    .where(eq(customerPaymentMethods.stripeId, source.id))
}
