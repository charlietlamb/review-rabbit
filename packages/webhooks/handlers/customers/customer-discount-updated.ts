import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { discounts } from '@burse/database/schema/wh/discounts'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleCustomerDiscountUpdated = async (event: Stripe.Event) => {
  const discount = event.data.object as Stripe.Discount

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Update the discount record
  await db
    .update(discounts)
    .set({
      promotionCodeId:
        typeof discount.promotion_code === 'string'
          ? discount.promotion_code
          : discount.promotion_code?.id,
      end: discount.end ? new Date(discount.end * 1000) : undefined,
      currency: discount.coupon.currency,
      amountOff: discount.coupon.amount_off?.toString(),
      percentOff: discount.coupon.percent_off?.toString(),
      duration: discount.coupon.duration,
      durationInMonths: discount.coupon.duration_in_months ?? undefined,
      metadata: discount.coupon.metadata ?? {},
      updatedAt: new Date(),
    })
    .where(eq(discounts.stripeId, discount.id))
}
