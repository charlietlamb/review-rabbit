import Stripe from 'stripe'
import { STRIPE_EVENTS, StripeEventType } from '../constants/stripe-events'
import { handleBalanceAvailable } from './balance/balance-available'
import { handleChargeCaptured } from './charges/charge-captured'
import { handleChargeExpired } from './charges/charge-expired'
import { handleChargeFailed } from './charges/charge-failed'
import { handleChargePending } from './charges/charge-pending'
import { handleChargeRefunded } from './charges/charge-refunded'
import { handleChargeSucceeded } from './charges/charge-succeeded'
import { handleChargeUpdated } from './charges/charge-updated'
import { handleChargeDisputeClosed } from './disputes/charge-dispute-closed'
import { handleChargeDisputeCreated } from './disputes/charge-dispute-created'
import { handleChargeDisputeFundsReinstated } from './disputes/charge-dispute-funds-reinstated'
import { handleChargeDisputeFundsWithdrawn } from './disputes/charge-dispute-funds-withdrawn'
import { handleChargeRefundUpdated } from './refunds/charge-refund-updated'
import { handleCheckoutSessionAsyncPaymentFailed } from './checkout/checkout-session-async-payment-failed'
import { handleCheckoutSessionAsyncPaymentSucceeded } from './checkout/checkout-session-async-payment-succeeded'
import { handleCheckoutSessionCompleted } from './checkout/checkout-session-completed'
import { handleCheckoutSessionExpired } from './checkout/checkout-session-expired'
import { handleCustomerCreated } from './customers/customer-created'
import { handleCustomerDeleted } from './customers/customer-deleted'
import { handleCustomerUpdated } from './customers/customer-updated'
import { handleCustomerDiscountCreated } from './customers/customer-discount-created'
import { handleCustomerDiscountDeleted } from './customers/customer-discount-deleted'
import { handleCustomerDiscountUpdated } from './customers/customer-discount-updated'
import { handleCustomerSourceCreated } from './customers/customer-source-created'
import { handleCustomerSourceDeleted } from './customers/customer-source-deleted'
import { handleCustomerSourceExpiring } from './customers/customer-source-expiring'
import { handleCustomerSourceUpdated } from './customers/customer-source-updated'
import { handleCustomerSubscriptionCreated } from './subscriptions/customer-subscription-created'
import { handleCustomerSubscriptionDeleted } from './subscriptions/customer-subscription-deleted'
import { handleCustomerSubscriptionTrialWillEnd } from './subscriptions/customer-subscription-trial-will-end'
import { handleCustomerSubscriptionUpdated } from './subscriptions/customer-subscription-updated'
import { handleInvoiceCreated } from './invoices/invoice-created'
import { handleInvoiceDeleted } from './invoices/invoice-deleted'
import { handleInvoiceFinalized } from './invoices/invoice-finalized'
import { handleInvoiceMarkedUncollectible } from './invoices/invoice-marked-uncollectible'
import { handleInvoicePaid } from './invoices/invoice-paid'
import { handleInvoicePaymentActionRequired } from './invoices/invoice-payment-action-required'
import { handleInvoicePaymentFailed } from './invoices/invoice-payment-failed'
import { handleInvoiceSent } from './invoices/invoice-sent'
import { handleInvoiceUpdated } from './invoices/invoice-updated'
import { handleInvoiceVoided } from './invoices/invoice-voided'
import { handlePaymentIntentCreated } from './payments/payment-intent-created'
import { handlePaymentIntentUpdated } from './payments/payment-intent-updated'
import { handlePaymentIntentSucceeded } from './payments/payment-intent-succeeded'
import { handlePaymentIntentFailed } from './payments/payment-intent-failed'
import { handlePayoutCreated } from './payouts/payout-created'
import { handlePayoutUpdated } from './payouts/payout-updated'
import { handlePayoutFailed } from './payouts/payout-failed'
import { handlePayoutPaid } from './payouts/payout-paid'
import { handlePayoutCanceled } from './payouts/payout-canceled'
import { handlePriceCreated } from './prices/price-created'
import { handlePriceUpdated } from './prices/price-updated'
import { handlePriceDeleted } from './prices/price-deleted'
import { handleProductCreated } from './products/product-created'
import { handleProductUpdated } from './products/product-updated'
import { handleProductDeleted } from './products/product-deleted'
import { handleSetupIntentCreated } from './setup-intents/setup-intent-created'
import { handleSetupIntentUpdated } from './setup-intents/setup-intent-updated'
import { handleSetupIntentCanceled } from './setup-intents/setup-intent-canceled'
import { handleSetupIntentRequiresAction } from './setup-intents/setup-intent-requires-action'
import { handleSetupIntentSetupFailed } from './setup-intents/setup-intent-setup-failed'
import { handleSetupIntentSucceeded } from './setup-intents/setup-intent-succeeded'
import { handleSubscriptionScheduleCreated } from './subscription-schedules/subscription-schedule-created'
import { handleSubscriptionScheduleUpdated } from './subscription-schedules/subscription-schedule-updated'
import { handleSubscriptionScheduleCanceled } from './subscription-schedules/subscription-schedule-canceled'
import { handleSubscriptionScheduleReleased } from './subscription-schedules/subscription-schedule-released'
import { handleSubscriptionScheduleCompleted } from './subscription-schedules/subscription-schedule-completed'
import { handleTaxRateCreated } from './tax-rates/tax-rate-created'
import { handleTaxRateUpdated } from './tax-rates/tax-rate-updated'
import { handleTransferCreated } from './transfers/transfer-created'
import { handleTransferUpdated } from './transfers/transfer-updated'
import { handleChargeDisputeUpdated } from './disputes/charge-dispute-updated'

type WebhookHandlers = {
  [K in StripeEventType]?: (event: Stripe.Event) => Promise<void>
}

export const webhookHandlers: WebhookHandlers = {
  // Balance Events
  [STRIPE_EVENTS.BALANCE_AVAILABLE]: async (event) =>
    await handleBalanceAvailable(event),

  // Charge Events
  [STRIPE_EVENTS.CHARGE_CAPTURED]: async (event) =>
    await handleChargeCaptured(event),

  [STRIPE_EVENTS.CHARGE_EXPIRED]: async (event) =>
    await handleChargeExpired(event),

  [STRIPE_EVENTS.CHARGE_FAILED]: async (event) =>
    await handleChargeFailed(event),

  [STRIPE_EVENTS.CHARGE_PENDING]: async (event) =>
    await handleChargePending(event),

  [STRIPE_EVENTS.CHARGE_REFUNDED]: async (event) =>
    await handleChargeRefunded(event),

  [STRIPE_EVENTS.CHARGE_SUCCEEDED]: async (event) =>
    await handleChargeSucceeded(event),

  [STRIPE_EVENTS.CHARGE_UPDATED]: async (event) =>
    await handleChargeUpdated(event),

  // Dispute Events
  [STRIPE_EVENTS.CHARGE_DISPUTE_CLOSED]: async (event) =>
    await handleChargeDisputeClosed(event),

  [STRIPE_EVENTS.CHARGE_DISPUTE_CREATED]: async (event) =>
    await handleChargeDisputeCreated(event),

  [STRIPE_EVENTS.CHARGE_DISPUTE_FUNDS_REINSTATED]: async (event) =>
    await handleChargeDisputeFundsReinstated(event),

  [STRIPE_EVENTS.CHARGE_DISPUTE_FUNDS_WITHDRAWN]: async (event) =>
    await handleChargeDisputeFundsWithdrawn(event),

  [STRIPE_EVENTS.CHARGE_DISPUTE_UPDATED]: async (event) =>
    await handleChargeDisputeUpdated(event),

  // Refund Events
  [STRIPE_EVENTS.CHARGE_REFUND_UPDATED]: async (event) =>
    await handleChargeRefundUpdated(event),

  // Checkout Events
  [STRIPE_EVENTS.CHECKOUT_SESSION_ASYNC_PAYMENT_FAILED]: async (event) =>
    await handleCheckoutSessionAsyncPaymentFailed(event),

  [STRIPE_EVENTS.CHECKOUT_SESSION_ASYNC_PAYMENT_SUCCEEDED]: async (event) =>
    await handleCheckoutSessionAsyncPaymentSucceeded(event),

  [STRIPE_EVENTS.CHECKOUT_SESSION_COMPLETED]: async (event) =>
    await handleCheckoutSessionCompleted(event),

  [STRIPE_EVENTS.CHECKOUT_SESSION_EXPIRED]: async (event) =>
    await handleCheckoutSessionExpired(event),

  // Customer Events
  [STRIPE_EVENTS.CUSTOMER_CREATED]: async (event) =>
    await handleCustomerCreated(event),

  [STRIPE_EVENTS.CUSTOMER_DELETED]: async (event) =>
    await handleCustomerDeleted(event),

  [STRIPE_EVENTS.CUSTOMER_UPDATED]: async (event) =>
    await handleCustomerUpdated(event),

  [STRIPE_EVENTS.CUSTOMER_DISCOUNT_CREATED]: async (event) =>
    await handleCustomerDiscountCreated(event),

  [STRIPE_EVENTS.CUSTOMER_DISCOUNT_DELETED]: async (event) =>
    await handleCustomerDiscountDeleted(event),

  [STRIPE_EVENTS.CUSTOMER_DISCOUNT_UPDATED]: async (event) =>
    await handleCustomerDiscountUpdated(event),

  [STRIPE_EVENTS.CUSTOMER_SOURCE_CREATED]: async (event) =>
    await handleCustomerSourceCreated(event),

  [STRIPE_EVENTS.CUSTOMER_SOURCE_DELETED]: async (event) =>
    await handleCustomerSourceDeleted(event),

  [STRIPE_EVENTS.CUSTOMER_SOURCE_EXPIRING]: async (event) =>
    await handleCustomerSourceExpiring(event),

  [STRIPE_EVENTS.CUSTOMER_SOURCE_UPDATED]: async (event) =>
    await handleCustomerSourceUpdated(event),

  // Subscription Events
  [STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_CREATED]: async (event) =>
    await handleCustomerSubscriptionCreated(event),

  [STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_DELETED]: async (event) =>
    await handleCustomerSubscriptionDeleted(event),

  [STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_PENDING_UPDATE_APPLIED]: async (event) =>
    await handleCustomerSubscriptionUpdated(event),

  [STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_PENDING_UPDATE_EXPIRED]: async (event) =>
    await handleCustomerSubscriptionUpdated(event),

  [STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_TRIAL_WILL_END]: async (event) =>
    await handleCustomerSubscriptionTrialWillEnd(event),

  [STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_UPDATED]: async (event) =>
    await handleCustomerSubscriptionUpdated(event),

  // Invoice Events
  [STRIPE_EVENTS.INVOICE_CREATED]: async (event) =>
    await handleInvoiceCreated(event),

  [STRIPE_EVENTS.INVOICE_DELETED]: async (event) =>
    await handleInvoiceDeleted(event),

  [STRIPE_EVENTS.INVOICE_FINALIZED]: async (event) =>
    await handleInvoiceFinalized(event),

  [STRIPE_EVENTS.INVOICE_MARKED_UNCOLLECTIBLE]: async (event) =>
    await handleInvoiceMarkedUncollectible(event),

  [STRIPE_EVENTS.INVOICE_PAID]: async (event) => await handleInvoicePaid(event),

  [STRIPE_EVENTS.INVOICE_PAYMENT_ACTION_REQUIRED]: async (event) =>
    await handleInvoicePaymentActionRequired(event),

  [STRIPE_EVENTS.INVOICE_PAYMENT_FAILED]: async (event) =>
    await handleInvoicePaymentFailed(event),

  [STRIPE_EVENTS.INVOICE_PAYMENT_SUCCEEDED]: async (event) =>
    await handleInvoicePaid(event),

  [STRIPE_EVENTS.INVOICE_SENT]: async (event) => await handleInvoiceSent(event),

  [STRIPE_EVENTS.INVOICE_UPCOMING]: async (event) => {
    // No action needed for upcoming invoices as they don't exist yet
    const invoice = event.data.object as Stripe.Invoice
  },

  [STRIPE_EVENTS.INVOICE_UPDATED]: async (event) =>
    await handleInvoiceUpdated(event),

  [STRIPE_EVENTS.INVOICE_VOIDED]: async (event) =>
    await handleInvoiceVoided(event),

  // Payment Intent Events
  [STRIPE_EVENTS.PAYMENT_INTENT_CREATED]: async (event: Stripe.Event) =>
    await handlePaymentIntentCreated(event),

  [STRIPE_EVENTS.PAYMENT_INTENT_UPDATED]: async (event: Stripe.Event) =>
    await handlePaymentIntentUpdated(event),

  [STRIPE_EVENTS.PAYMENT_INTENT_SUCCEEDED]: async (event: Stripe.Event) =>
    await handlePaymentIntentSucceeded(event),

  [STRIPE_EVENTS.PAYMENT_INTENT_PAYMENT_FAILED]: async (event: Stripe.Event) =>
    await handlePaymentIntentFailed(event),

  [STRIPE_EVENTS.PAYMENT_INTENT_AMOUNT_CAPTURABLE_UPDATED]: async (
    event: Stripe.Event
  ) => await handlePaymentIntentUpdated(event),

  [STRIPE_EVENTS.PAYMENT_INTENT_CANCELED]: async (event: Stripe.Event) =>
    await handlePaymentIntentUpdated(event),

  [STRIPE_EVENTS.PAYMENT_INTENT_PARTIALLY_FUNDED]: async (
    event: Stripe.Event
  ) => await handlePaymentIntentUpdated(event),

  [STRIPE_EVENTS.PAYMENT_INTENT_PROCESSING]: async (event: Stripe.Event) =>
    await handlePaymentIntentUpdated(event),

  [STRIPE_EVENTS.PAYMENT_INTENT_REQUIRES_ACTION]: async (event: Stripe.Event) =>
    await handlePaymentIntentUpdated(event),

  // Payout Events
  [STRIPE_EVENTS.PAYOUT_CREATED]: async (event: Stripe.Event) =>
    await handlePayoutCreated(event),

  [STRIPE_EVENTS.PAYOUT_UPDATED]: async (event: Stripe.Event) =>
    await handlePayoutUpdated(event),

  [STRIPE_EVENTS.PAYOUT_FAILED]: async (event: Stripe.Event) =>
    await handlePayoutFailed(event),

  [STRIPE_EVENTS.PAYOUT_PAID]: async (event: Stripe.Event) =>
    await handlePayoutPaid(event),

  [STRIPE_EVENTS.PAYOUT_CANCELED]: async (event: Stripe.Event) =>
    await handlePayoutCanceled(event),

  // Price Events
  [STRIPE_EVENTS.PRICE_CREATED]: async (event: Stripe.Event) =>
    await handlePriceCreated(event),

  [STRIPE_EVENTS.PRICE_UPDATED]: async (event: Stripe.Event) =>
    await handlePriceUpdated(event),

  [STRIPE_EVENTS.PRICE_DELETED]: async (event: Stripe.Event) =>
    await handlePriceDeleted(event),

  // Product Events
  [STRIPE_EVENTS.PRODUCT_CREATED]: async (event: Stripe.Event) =>
    await handleProductCreated(event),

  [STRIPE_EVENTS.PRODUCT_UPDATED]: async (event: Stripe.Event) =>
    await handleProductUpdated(event),

  [STRIPE_EVENTS.PRODUCT_DELETED]: async (event: Stripe.Event) =>
    await handleProductDeleted(event),

  // Setup Intent Events
  [STRIPE_EVENTS.SETUP_INTENT_CANCELED]: async (event) =>
    await handleSetupIntentCanceled(event),

  [STRIPE_EVENTS.SETUP_INTENT_CREATED]: async (event) =>
    await handleSetupIntentCreated(event),

  [STRIPE_EVENTS.SETUP_INTENT_REQUIRES_ACTION]: async (event) =>
    await handleSetupIntentRequiresAction(event),

  [STRIPE_EVENTS.SETUP_INTENT_SETUP_FAILED]: async (event) =>
    await handleSetupIntentSetupFailed(event),

  [STRIPE_EVENTS.SETUP_INTENT_SUCCEEDED]: async (event) =>
    await handleSetupIntentSucceeded(event),

  [STRIPE_EVENTS.SETUP_INTENT_UPDATED]: async (event) =>
    await handleSetupIntentUpdated(event),

  // Subscription Schedule Events
  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_ABORTED]: async (event) =>
    await handleSubscriptionScheduleCanceled(event),

  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_CANCELED]: async (event) =>
    await handleSubscriptionScheduleCanceled(event),

  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_COMPLETED]: async (event) =>
    await handleSubscriptionScheduleCompleted(event),

  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_CREATED]: async (event) =>
    await handleSubscriptionScheduleCreated(event),

  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_EXPIRING]: async (event) =>
    await handleSubscriptionScheduleUpdated(event),

  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_RELEASED]: async (event) =>
    await handleSubscriptionScheduleReleased(event),

  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_UPDATED]: async (event) =>
    await handleSubscriptionScheduleUpdated(event),

  // Tax Rate Events
  [STRIPE_EVENTS.TAX_RATE_CREATED]: async (event) =>
    await handleTaxRateCreated(event),

  [STRIPE_EVENTS.TAX_RATE_UPDATED]: async (event) =>
    await handleTaxRateUpdated(event),

  // Transfer Events
  [STRIPE_EVENTS.TRANSFER_CREATED]: async (event) =>
    await handleTransferCreated(event),

  [STRIPE_EVENTS.TRANSFER_REVERSED]: async (event) =>
    await handleTransferUpdated(event),

  [STRIPE_EVENTS.TRANSFER_UPDATED]: async (event) =>
    await handleTransferUpdated(event),
}
