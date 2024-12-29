import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { setupIntents } from '@burse/database/schema/wh/setup-intents'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleSetupIntentSucceeded = async (event: Stripe.Event) => {
  try {
    const setupIntent = event.data.object as Stripe.SetupIntent

    // Get the Stripe Connect account
    const stripeConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.id, event.account!),
    })

    if (!stripeConnect) {
      throw new Error(
        `No Stripe Connect account found for ID: ${event.account}`
      )
    }

    // Get the existing setup intent
    const existingSetupIntent = await db.query.setupIntents.findFirst({
      where: eq(setupIntents.stripeId, setupIntent.id),
    })

    if (!existingSetupIntent) {
      throw new Error(`No Setup Intent found with ID: ${setupIntent.id}`)
    }

    // Update the setup intent record with success details
    await db
      .update(setupIntents)
      .set({
        status: setupIntent.status,
        paymentMethodId:
          typeof setupIntent.payment_method === 'string'
            ? setupIntent.payment_method
            : (setupIntent.payment_method?.id ?? null),
        updatedAt: new Date(),
      })
      .where(eq(setupIntents.stripeId, setupIntent.id))
  } catch (error) {
    console.error('Error handling setup.intent.succeeded event:', error)
    throw error
  }
}
