export const EVENTS = {
  // Charges
  CHARGE_CAPTURED: 'charge.captured',
  CHARGE_EXPIRED: 'charge.expired',
  CHARGE_FAILED: 'charge.failed',
  CHARGE_PENDING: 'charge.pending',
  CHARGE_REFUNDED: 'charge.refunded',
  CHARGE_SUCCEEDED: 'charge.succeeded',
  CHARGE_UPDATED: 'charge.updated',

  // Customers
  CUSTOMER_CREATED: 'customer.created',
  CUSTOMER_DELETED: 'customer.deleted',
  CUSTOMER_UPDATED: 'customer.updated',

  // Payments
  PAYMENT_INTENT_CANCELLED: 'payment_intent.payment_cancelled',
  PAYMENT_INTENT_CREATED: 'payment_intent.created',
  PAYMENT_INTENT_PARTIALLY_FUNDED: 'payment_intent.partially_funded',
  PAYMENT_INTENT_PAYMENT_FAILED: 'payment_intent.payment_failed',
  PAYMENT_INTENT_PROCESSING: 'payment_intent.processing',
  PAYMENT_INTENT_REQUIRES_ACTION: 'payment_intent.requires_action',
  PAYMENT_INTENT_SUCCEEDED: 'payment_intent.succeeded',

  // Subscriptions
  SUBSCRIPTION_CREATED: 'customer.subscription.created',
  SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
  SUBSCRIPTION_PAUSED: 'customer.subscription.paused',
  SUBSCRIPTION_PENDING_UPDATE_APPLIED:
    'customer.subscription.pending_update_applied',
  SUBSCRIPTION_PENDING_UPDATE_EXPIRED:
    'customer.subscription.pending_update_expired',
  SUBSCRIPTION_RESUMED: 'customer.subscription.resumed',
  SUBSCRIPTION_TRIAL_WILL_END: 'customer.subscription.trial_will_end',
  SUBSCRIPTION_UPDATED: 'customer.subscription.updated',

  // Subscription Schedule
  SUBSCRIPTION_SCHEDULE_ABORTED: 'subscription_schedule.aborted',
  SUBSCRIPTION_SCHEDULE_CANCELED: 'subscription_schedule.canceled',
  SUBSCRIPTION_SCHEDULE_COMPLETED: 'subscription_schedule.completed',
  SUBSCRIPTION_SCHEDULE_CREATED: 'subscription_schedule.created',
  SUBSCRIPTION_SCHEDULE_EXPIRING: 'subscription_schedule.expiring',
  SUBSCRIPTION_SCHEDULE_RELEASED: 'subscription_schedule.released',
  SUBSCRIPTION_SCHEDULE_UPDATED: 'subscription_schedule.updated',

  // Refunds
  REFUND_CREATED: 'refund.created',
  REFUND_FAILED: 'refund.failed',
  REFUND_UPDATED: 'refund.updated',
}
