import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { customerPaymentMethods } from '@burse/database/schema/wh/customer-payment-methods'
import { customers } from '@burse/database/schema/wh/customers'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export const handleCustomerSourceCreated = async (event: Stripe.Event) => {
  const source = event.data.object as Stripe.Card

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Get the customer record
  const customer = await db.query.customers.findFirst({
    where: eq(customers.stripeId, source.customer as string),
  })

  if (!customer) {
    throw new Error(`No customer found for ID: ${source.customer}`)
  }

  // Create the payment method record
  await db.insert(customerPaymentMethods).values({
    id: uuidv4(),
    userId: stripeConnect.userId,
    stripeId: source.id,
    customerId: customer.id,
    type: 'card',
    status: 'active',
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
    isDefault: false,
    metadata: source.metadata ?? {},
  })
}
