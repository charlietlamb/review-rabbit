import { db } from '@rabbit/database'
import { events } from '@rabbit/database/schema/stripe/events'
import { EVENTS } from '../events'
import { Stripe } from 'stripe'
import {
  handlePaymentIntentCancelled,
  handlePaymentIntentCreated,
  handlePaymentIntentPartiallyFunded,
  handlePaymentIntentPaymentFailed,
  handlePaymentIntentProcessing,
  handlePaymentIntentRequiresAction,
  handlePaymentIntentSucceeded,
} from './events/payments'
import {
  handleSubscriptionCreated,
  handleSubscriptionDeleted,
  handleSubscriptionPaused,
  handleSubscriptionPendingUpdateApplied,
  handleSubscriptionPendingUpdateExpired,
  handleSubscriptionResumed,
  handleSubscriptionTrialWillEnd,
  handleSubscriptionUpdated,
} from './events/subscriptions'
import {
  handleCustomerCreated,
  handleCustomerDeleted,
  handleCustomerUpdated,
} from './events/customer'
import {
  handleChargeCaptured,
  handleChargeExpired,
  handleChargeFailed,
  handleChargePending,
  handleChargeRefunded,
  handleChargeSucceeded,
  handleChargeUpdated,
} from './events/charges'
import {
  handleSubscriptionScheduleAborted,
  handleSubscriptionScheduleCanceled,
  handleSubscriptionScheduleCompleted,
  handleSubscriptionScheduleCreated,
  handleSubscriptionScheduleExpiring,
  handleSubscriptionScheduleReleased,
  handleSubscriptionScheduleUpdated,
} from './events/subscription-schedule'

export async function handleStripeEvent(event: Stripe.Event) {
  const { type, data } = event
  await db.insert(events).values({
    type,
    text: JSON.stringify(data),
  })

  switch (type) {
    // Charges
    case EVENTS.CHARGE_CAPTURED: {
      await handleChargeCaptured(event)
      break
    }
    case EVENTS.CHARGE_EXPIRED: {
      await handleChargeExpired(event)
      break
    }
    case EVENTS.CHARGE_FAILED: {
      await handleChargeFailed(event)
      break
    }
    case EVENTS.CHARGE_PENDING: {
      await handleChargePending(event)
      break
    }
    case EVENTS.CHARGE_REFUNDED: {
      await handleChargeRefunded(event)
      break
    }
    case EVENTS.CHARGE_SUCCEEDED: {
      await handleChargeSucceeded(event)
      break
    }
    case EVENTS.CHARGE_UPDATED: {
      await handleChargeUpdated(event)
      break
    }

    // Customers
    case EVENTS.CUSTOMER_CREATED: {
      await handleCustomerCreated(event)
      break
    }
    case EVENTS.CUSTOMER_DELETED: {
      await handleCustomerDeleted(event)
      break
    }
    case EVENTS.CUSTOMER_UPDATED: {
      await handleCustomerUpdated(event)
      break
    }

    // Subscriptions
    case EVENTS.SUBSCRIPTION_CREATED: {
      await handleSubscriptionCreated(event)
      break
    }
    case EVENTS.SUBSCRIPTION_DELETED: {
      await handleSubscriptionDeleted(event)
      break
    }
    case EVENTS.SUBSCRIPTION_PAUSED: {
      await handleSubscriptionPaused(event)
      break
    }
    case EVENTS.SUBSCRIPTION_PENDING_UPDATE_APPLIED: {
      await handleSubscriptionPendingUpdateApplied(event)
      break
    }
    case EVENTS.SUBSCRIPTION_PENDING_UPDATE_EXPIRED: {
      await handleSubscriptionPendingUpdateExpired(event)
      break
    }
    case EVENTS.SUBSCRIPTION_RESUMED: {
      await handleSubscriptionResumed(event)
      break
    }
    case EVENTS.SUBSCRIPTION_TRIAL_WILL_END: {
      await handleSubscriptionTrialWillEnd(event)
      break
    }
    case EVENTS.SUBSCRIPTION_UPDATED: {
      await handleSubscriptionUpdated(event)
      break
    }

    // Subscription Schedules
    case EVENTS.SUBSCRIPTION_SCHEDULE_ABORTED: {
      await handleSubscriptionScheduleAborted(event)
      break
    }
    case EVENTS.SUBSCRIPTION_SCHEDULE_CANCELED: {
      await handleSubscriptionScheduleCanceled(event)
      break
    }
    case EVENTS.SUBSCRIPTION_SCHEDULE_COMPLETED: {
      await handleSubscriptionScheduleCompleted(event)
      break
    }
    case EVENTS.SUBSCRIPTION_SCHEDULE_CREATED: {
      await handleSubscriptionScheduleCreated(event)
      break
    }
    case EVENTS.SUBSCRIPTION_SCHEDULE_EXPIRING: {
      await handleSubscriptionScheduleExpiring(event)
      break
    }
    case EVENTS.SUBSCRIPTION_SCHEDULE_RELEASED: {
      await handleSubscriptionScheduleReleased(event)
      break
    }
    case EVENTS.SUBSCRIPTION_SCHEDULE_UPDATED: {
      await handleSubscriptionScheduleUpdated(event)
      break
    }

    // Payments
    case EVENTS.PAYMENT_INTENT_CANCELLED: {
      await handlePaymentIntentCancelled(event)
      break
    }

    case EVENTS.PAYMENT_INTENT_CREATED: {
      await handlePaymentIntentCreated(event)
      break
    }

    case EVENTS.PAYMENT_INTENT_PARTIALLY_FUNDED: {
      await handlePaymentIntentPartiallyFunded(event)
      break
    }

    case EVENTS.PAYMENT_INTENT_PAYMENT_FAILED: {
      await handlePaymentIntentPaymentFailed(event)
      break
    }

    case EVENTS.PAYMENT_INTENT_PROCESSING: {
      await handlePaymentIntentProcessing(event)
      break
    }

    case EVENTS.PAYMENT_INTENT_REQUIRES_ACTION: {
      await handlePaymentIntentRequiresAction(event)
      break
    }

    case EVENTS.PAYMENT_INTENT_SUCCEEDED: {
      await handlePaymentIntentSucceeded(event)
      break
    }
  }
}
