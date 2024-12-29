import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { setupIntents } from '@burse/database/schema/wh/setup-intents'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleSetupIntentCreated = async (event: Stripe.Event) => {
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

    // Check if setup intent already exists
    const existingSetupIntent = await db.query.setupIntents.findFirst({
      where: eq(setupIntents.stripeId, setupIntent.id),
    })

    if (existingSetupIntent) {
      throw new Error(`Setup Intent already exists with ID: ${setupIntent.id}`)
    }

    // Create the setup intent record
    await db.insert(setupIntents).values({
      id: setupIntent.id,
      userId: stripeConnect.userId,
      stripeId: setupIntent.id,
      customerId: setupIntent.customer as string,
      paymentMethodId:
        typeof setupIntent.payment_method === 'string'
          ? setupIntent.payment_method
          : (setupIntent.payment_method?.id ?? null),
      status: setupIntent.status,
      usage: setupIntent.usage,
      paymentMethodTypes: setupIntent.payment_method_types,
      clientSecret: setupIntent.client_secret,
      description: setupIntent.description,
      lastSetupError: setupIntent.last_setup_error
        ? {
            code: setupIntent.last_setup_error.code ?? undefined,
            message: setupIntent.last_setup_error.message ?? 'Unknown error',
            type: setupIntent.last_setup_error.type,
          }
        : null,
      nextAction: setupIntent.next_action,
      paymentMethodOptions: setupIntent.payment_method_options,
      metadata: setupIntent.metadata,
    })
  } catch (error) {
    console.error('Error handling setup.intent.created event:', error)
    throw error
  }
}
