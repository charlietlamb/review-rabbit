import { Stripe } from 'stripe'
import { webhookHandlers } from './handlers/stripe-webhooks'
import { StripeEventType } from './constants/stripe-events'
import { saveStripeEvent } from './handlers/utils/save-event'

export async function handleStripeWebhook(
  event: Stripe.Event
): Promise<{ success: boolean; message?: string }> {
  try {
    // Save the event to the database first
    await saveStripeEvent(event)

    const handler = webhookHandlers[event.type as StripeEventType]

    if (!handler) {
      console.log(`No handler found for event type: ${event.type}`)
      return { success: true, message: 'Event type not handled' }
    }

    await handler(event)
    return { success: true }
  } catch (error) {
    console.error(`Error handling ${event.type}:`, error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
