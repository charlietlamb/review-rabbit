import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { customerPaymentMethods } from '@burse/database/schema/wh/customer-payment-methods'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleCustomerSourceDeleted = async (event: Stripe.Event) => {
  const source = event.data.object as Stripe.Card

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Delete the payment method record
  await db
    .delete(customerPaymentMethods)
    .where(eq(customerPaymentMethods.stripeId, source.id))
}
