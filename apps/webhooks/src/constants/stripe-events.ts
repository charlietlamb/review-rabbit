export const STRIPE_EVENTS = {
  // Balance Events
  BALANCE_AVAILABLE: 'balance.available',

  // Charge Events
  CHARGE_CAPTURED: 'charge.captured',
  CHARGE_EXPIRED: 'charge.expired',
  CHARGE_FAILED: 'charge.failed',
  CHARGE_PENDING: 'charge.pending',
  CHARGE_REFUNDED: 'charge.refunded',
  CHARGE_SUCCEEDED: 'charge.succeeded',
  CHARGE_UPDATED: 'charge.updated',
  CHARGE_DISPUTE_CLOSED: 'charge.dispute.closed',
  CHARGE_DISPUTE_CREATED: 'charge.dispute.created',
  CHARGE_DISPUTE_FUNDS_REINSTATED: 'charge.dispute.funds_reinstated',
  CHARGE_DISPUTE_FUNDS_WITHDRAWN: 'charge.dispute.funds_withdrawn',
  CHARGE_DISPUTE_UPDATED: 'charge.dispute.updated',
  CHARGE_REFUND_UPDATED: 'charge.refund.updated',

  // Checkout Events
  CHECKOUT_SESSION_ASYNC_PAYMENT_FAILED:
    'checkout.session.async_payment_failed',
  CHECKOUT_SESSION_ASYNC_PAYMENT_SUCCEEDED:
    'checkout.session.async_payment_succeeded',
  CHECKOUT_SESSION_COMPLETED: 'checkout.session.completed',
  CHECKOUT_SESSION_EXPIRED: 'checkout.session.expired',

  // Customer Events
  CUSTOMER_CREATED: 'customer.created',
  CUSTOMER_DELETED: 'customer.deleted',
  CUSTOMER_UPDATED: 'customer.updated',
  CUSTOMER_DISCOUNT_CREATED: 'customer.discount.created',
  CUSTOMER_DISCOUNT_DELETED: 'customer.discount.deleted',
  CUSTOMER_DISCOUNT_UPDATED: 'customer.discount.updated',
  CUSTOMER_SOURCE_CREATED: 'customer.source.created',
  CUSTOMER_SOURCE_DELETED: 'customer.source.deleted',
  CUSTOMER_SOURCE_EXPIRING: 'customer.source.expiring',
  CUSTOMER_SOURCE_UPDATED: 'customer.source.updated',
  CUSTOMER_SUBSCRIPTION_CREATED: 'customer.subscription.created',
  CUSTOMER_SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
  CUSTOMER_SUBSCRIPTION_PENDING_UPDATE_APPLIED:
    'customer.subscription.pending_update_applied',
  CUSTOMER_SUBSCRIPTION_PENDING_UPDATE_EXPIRED:
    'customer.subscription.pending_update_expired',
  CUSTOMER_SUBSCRIPTION_TRIAL_WILL_END: 'customer.subscription.trial_will_end',
  CUSTOMER_SUBSCRIPTION_UPDATED: 'customer.subscription.updated',

  // Invoice Events
  INVOICE_CREATED: 'invoice.created',
  INVOICE_DELETED: 'invoice.deleted',
  INVOICE_FINALIZED: 'invoice.finalized',
  INVOICE_MARKED_UNCOLLECTIBLE: 'invoice.marked_uncollectible',
  INVOICE_PAID: 'invoice.paid',
  INVOICE_PAYMENT_ACTION_REQUIRED: 'invoice.payment_action_required',
  INVOICE_PAYMENT_FAILED: 'invoice.payment_failed',
  INVOICE_PAYMENT_SUCCEEDED: 'invoice.payment_succeeded',
  INVOICE_SENT: 'invoice.sent',
  INVOICE_UPCOMING: 'invoice.upcoming',
  INVOICE_UPDATED: 'invoice.updated',
  INVOICE_VOIDED: 'invoice.voided',

  // Payment Intent Events
  PAYMENT_INTENT_AMOUNT_CAPTURABLE_UPDATED:
    'payment_intent.amount_capturable_updated',
  PAYMENT_INTENT_CANCELED: 'payment_intent.canceled',
  PAYMENT_INTENT_CREATED: 'payment_intent.created',
  PAYMENT_INTENT_PARTIALLY_FUNDED: 'payment_intent.partially_funded',
  PAYMENT_INTENT_PAYMENT_FAILED: 'payment_intent.payment_failed',
  PAYMENT_INTENT_PROCESSING: 'payment_intent.processing',
  PAYMENT_INTENT_REQUIRES_ACTION: 'payment_intent.requires_action',
  PAYMENT_INTENT_SUCCEEDED: 'payment_intent.succeeded',

  // Payout Events
  PAYOUT_CANCELED: 'payout.canceled',
  PAYOUT_CREATED: 'payout.created',
  PAYOUT_FAILED: 'payout.failed',
  PAYOUT_PAID: 'payout.paid',
  PAYOUT_UPDATED: 'payout.updated',

  // Price Events
  PRICE_CREATED: 'price.created',
  PRICE_DELETED: 'price.deleted',
  PRICE_UPDATED: 'price.updated',

  // Product Events
  PRODUCT_CREATED: 'product.created',
  PRODUCT_DELETED: 'product.deleted',
  PRODUCT_UPDATED: 'product.updated',

  // Setup Intent Events
  SETUP_INTENT_CANCELED: 'setup_intent.canceled',
  SETUP_INTENT_CREATED: 'setup_intent.created',
  SETUP_INTENT_REQUIRES_ACTION: 'setup_intent.requires_action',
  SETUP_INTENT_SETUP_FAILED: 'setup_intent.setup_failed',
  SETUP_INTENT_SUCCEEDED: 'setup_intent.succeeded',

  // Subscription Schedule Events
  SUBSCRIPTION_SCHEDULE_ABORTED: 'subscription_schedule.aborted',
  SUBSCRIPTION_SCHEDULE_CANCELED: 'subscription_schedule.canceled',
  SUBSCRIPTION_SCHEDULE_COMPLETED: 'subscription_schedule.completed',
  SUBSCRIPTION_SCHEDULE_CREATED: 'subscription_schedule.created',
  SUBSCRIPTION_SCHEDULE_EXPIRING: 'subscription_schedule.expiring',
  SUBSCRIPTION_SCHEDULE_RELEASED: 'subscription_schedule.released',
  SUBSCRIPTION_SCHEDULE_UPDATED: 'subscription_schedule.updated',

  // Tax Rate Events
  TAX_RATE_CREATED: 'tax_rate.created',
  TAX_RATE_UPDATED: 'tax_rate.updated',

  // Transfer Events
  TRANSFER_CREATED: 'transfer.created',
  TRANSFER_REVERSED: 'transfer.reversed',
  TRANSFER_UPDATED: 'transfer.updated',
} as const

// Type for all Stripe event strings
export type StripeEventType = (typeof STRIPE_EVENTS)[keyof typeof STRIPE_EVENTS]
