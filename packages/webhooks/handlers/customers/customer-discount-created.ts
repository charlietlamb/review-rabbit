import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { discounts } from '@burse/database/schema/wh/discounts'
import { customers } from '@burse/database/schema/wh/customers'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export const handleCustomerDiscountCreated = async (event: Stripe.Event) => {
  const discount = event.data.object as Stripe.Discount

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Get the customer record
  const customer = await db.query.customers.findFirst({
    where: eq(customers.stripeId, discount.customer as string),
  })

  if (!customer) {
    throw new Error(`No customer found for ID: ${discount.customer}`)
  }

  // Create the discount record
  await db.insert(discounts).values({
    id: uuidv4(),
    userId: stripeConnect.userId,
    stripeId: discount.id,
    customerId: customer.id,
    couponId: discount.coupon.id,
    promotionCodeId:
      typeof discount.promotion_code === 'string'
        ? discount.promotion_code
        : discount.promotion_code?.id,
    start: new Date(discount.start * 1000),
    end: discount.end ? new Date(discount.end * 1000) : undefined,
    currency: discount.coupon.currency,
    amountOff: discount.coupon.amount_off?.toString(),
    percentOff: discount.coupon.percent_off?.toString(),
    duration: discount.coupon.duration,
    durationInMonths: discount.coupon.duration_in_months ?? undefined,
    metadata: discount.coupon.metadata ?? {},
  })
}
