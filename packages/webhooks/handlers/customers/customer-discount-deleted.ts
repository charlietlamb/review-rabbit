import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { discounts } from '@burse/database/schema/wh/discounts'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleCustomerDiscountDeleted = async (event: Stripe.Event) => {
  const discount = event.data.object as Stripe.Discount

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Delete the discount record
  await db.delete(discounts).where(eq(discounts.stripeId, discount.id))
}
