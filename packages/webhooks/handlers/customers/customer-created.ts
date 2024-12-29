import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { customers } from '@burse/database/schema/wh/customers'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export const handleCustomerCreated = async (event: Stripe.Event) => {
  const customer = event.data.object as Stripe.Customer

  // Get the user ID from the Stripe Connect account
  const stripeConnect = await db.query.stripeConnects.findFirst({
    where: eq(stripeConnects.id, event.account!),
  })

  if (!stripeConnect) {
    throw new Error(`No Stripe Connect account found for ID: ${event.account}`)
  }

  // Create the customer record
  await db.insert(customers).values({
    id: uuidv4(),
    userId: stripeConnect.userId,
    stripeId: customer.id,
    email: customer.email ?? '',
    name: customer.name ?? undefined,
    metadata: customer.metadata ?? {},
  })
}
