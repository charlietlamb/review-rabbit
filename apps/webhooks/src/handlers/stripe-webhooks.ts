import Stripe from 'stripe'
import { STRIPE_EVENTS, StripeEventType } from '../constants/stripe-events'

type WebhookHandlers = {
  [K in StripeEventType]?: (event: Stripe.Event) => Promise<void>
}

export const webhookHandlers: WebhookHandlers = {
  // Balance Events
  [STRIPE_EVENTS.BALANCE_AVAILABLE]: async (event) => {
    const balance = event.data.object as Stripe.Balance
    console.log('Balance Available:', balance)
  },

  // Charge Events
  [STRIPE_EVENTS.CHARGE_CAPTURED]: async (event) => {
    const charge = event.data.object as Stripe.Charge
    console.log('Charge Captured:', charge.id)
  },

  [STRIPE_EVENTS.CHARGE_EXPIRED]: async (event) => {
    const charge = event.data.object as Stripe.Charge
    console.log('Charge Expired:', charge.id)
  },

  [STRIPE_EVENTS.CHARGE_FAILED]: async (event) => {
    const charge = event.data.object as Stripe.Charge
    console.log('Charge Failed:', charge.id)
  },

  [STRIPE_EVENTS.CHARGE_PENDING]: async (event) => {
    const charge = event.data.object as Stripe.Charge
    console.log('Charge Pending:', charge.id)
  },

  [STRIPE_EVENTS.CHARGE_REFUNDED]: async (event) => {
    const charge = event.data.object as Stripe.Charge
    console.log('Charge Refunded:', charge.id)
  },

  [STRIPE_EVENTS.CHARGE_SUCCEEDED]: async (event) => {
    const charge = event.data.object as Stripe.Charge
    console.log('Charge Succeeded:', charge.id)
  },

  [STRIPE_EVENTS.CHARGE_UPDATED]: async (event) => {
    const charge = event.data.object as Stripe.Charge
    console.log('Charge Updated:', charge.id)
  },

  [STRIPE_EVENTS.CHARGE_DISPUTE_CLOSED]: async (event) => {
    const dispute = event.data.object as Stripe.Dispute
    console.log('Charge Dispute Closed:', dispute.id)
  },

  [STRIPE_EVENTS.CHARGE_DISPUTE_CREATED]: async (event) => {
    const dispute = event.data.object as Stripe.Dispute
    console.log('Charge Dispute Created:', dispute.id)
  },

  [STRIPE_EVENTS.CHARGE_DISPUTE_FUNDS_REINSTATED]: async (event) => {
    const dispute = event.data.object as Stripe.Dispute
    console.log('Charge Dispute Funds Reinstated:', dispute.id)
  },

  [STRIPE_EVENTS.CHARGE_DISPUTE_FUNDS_WITHDRAWN]: async (event) => {
    const dispute = event.data.object as Stripe.Dispute
    console.log('Charge Dispute Funds Withdrawn:', dispute.id)
  },

  [STRIPE_EVENTS.CHARGE_DISPUTE_UPDATED]: async (event) => {
    const dispute = event.data.object as Stripe.Dispute
    console.log('Charge Dispute Updated:', dispute.id)
  },

  [STRIPE_EVENTS.CHARGE_REFUND_UPDATED]: async (event) => {
    const refund = event.data.object as Stripe.Refund
    console.log('Charge Refund Updated:', refund.id)
  },

  // Checkout Events
  [STRIPE_EVENTS.CHECKOUT_SESSION_ASYNC_PAYMENT_FAILED]: async (event) => {
    const session = event.data.object as Stripe.Checkout.Session
    console.log('Checkout Session Async Payment Failed:', session.id)
  },

  [STRIPE_EVENTS.CHECKOUT_SESSION_ASYNC_PAYMENT_SUCCEEDED]: async (event) => {
    const session = event.data.object as Stripe.Checkout.Session
    console.log('Checkout Session Async Payment Succeeded:', session.id)
  },

  [STRIPE_EVENTS.CHECKOUT_SESSION_COMPLETED]: async (event) => {
    const session = event.data.object as Stripe.Checkout.Session
    console.log('Checkout Session Completed:', session.id)
  },

  [STRIPE_EVENTS.CHECKOUT_SESSION_EXPIRED]: async (event) => {
    const session = event.data.object as Stripe.Checkout.Session
    console.log('Checkout Session Expired:', session.id)
  },

  // Customer Events
  [STRIPE_EVENTS.CUSTOMER_CREATED]: async (event) => {
    const customer = event.data.object as Stripe.Customer
    console.log('Customer Created:', customer.id)
  },

  [STRIPE_EVENTS.CUSTOMER_DELETED]: async (event) => {
    const customer = event.data.object as Stripe.Customer
    console.log('Customer Deleted:', customer.id)
  },

  [STRIPE_EVENTS.CUSTOMER_UPDATED]: async (event) => {
    const customer = event.data.object as Stripe.Customer
    console.log('Customer Updated:', customer.id)
  },

  [STRIPE_EVENTS.CUSTOMER_DISCOUNT_CREATED]: async (event) => {
    const discount = event.data.object as Stripe.Discount
    console.log('Customer Discount Created:', discount.id)
  },

  [STRIPE_EVENTS.CUSTOMER_DISCOUNT_DELETED]: async (event) => {
    const discount = event.data.object as Stripe.Discount
    console.log('Customer Discount Deleted:', discount.id)
  },

  [STRIPE_EVENTS.CUSTOMER_DISCOUNT_UPDATED]: async (event) => {
    const discount = event.data.object as Stripe.Discount
    console.log('Customer Discount Updated:', discount.id)
  },

  [STRIPE_EVENTS.CUSTOMER_SOURCE_CREATED]: async (event) => {
    const source = event.data.object as Stripe.CustomerSource
    console.log('Customer Source Created:', source.id)
  },

  [STRIPE_EVENTS.CUSTOMER_SOURCE_DELETED]: async (event) => {
    const source = event.data.object as Stripe.CustomerSource
    console.log('Customer Source Deleted:', source.id)
  },

  [STRIPE_EVENTS.CUSTOMER_SOURCE_EXPIRING]: async (event) => {
    const source = event.data.object as Stripe.CustomerSource
    console.log('Customer Source Expiring:', source.id)
  },

  [STRIPE_EVENTS.CUSTOMER_SOURCE_UPDATED]: async (event) => {
    const source = event.data.object as Stripe.CustomerSource
    console.log('Customer Source Updated:', source.id)
  },

  // Subscription Events
  [STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_CREATED]: async (event) => {
    const subscription = event.data.object as Stripe.Subscription
    console.log('Subscription Created:', subscription.id)
  },

  [STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_DELETED]: async (event) => {
    const subscription = event.data.object as Stripe.Subscription
    console.log('Subscription Deleted:', subscription.id)
  },

  [STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_PENDING_UPDATE_APPLIED]: async (
    event
  ) => {
    const subscription = event.data.object as Stripe.Subscription
    console.log('Subscription Pending Update Applied:', subscription.id)
  },

  [STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_PENDING_UPDATE_EXPIRED]: async (
    event
  ) => {
    const subscription = event.data.object as Stripe.Subscription
    console.log('Subscription Pending Update Expired:', subscription.id)
  },

  [STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_TRIAL_WILL_END]: async (event) => {
    const subscription = event.data.object as Stripe.Subscription
    console.log('Subscription Trial Will End:', subscription.id)
  },

  [STRIPE_EVENTS.CUSTOMER_SUBSCRIPTION_UPDATED]: async (event) => {
    const subscription = event.data.object as Stripe.Subscription
    console.log('Subscription Updated:', subscription.id)
  },

  // Invoice Events
  [STRIPE_EVENTS.INVOICE_CREATED]: async (event) => {
    const invoice = event.data.object as Stripe.Invoice
    console.log('Invoice Created:', invoice.id)
  },

  [STRIPE_EVENTS.INVOICE_DELETED]: async (event) => {
    const invoice = event.data.object as Stripe.Invoice
    console.log('Invoice Deleted:', invoice.id)
  },

  [STRIPE_EVENTS.INVOICE_FINALIZED]: async (event) => {
    const invoice = event.data.object as Stripe.Invoice
    console.log('Invoice Finalized:', invoice.id)
  },

  [STRIPE_EVENTS.INVOICE_MARKED_UNCOLLECTIBLE]: async (event) => {
    const invoice = event.data.object as Stripe.Invoice
    console.log('Invoice Marked Uncollectible:', invoice.id)
  },

  [STRIPE_EVENTS.INVOICE_PAID]: async (event) => {
    const invoice = event.data.object as Stripe.Invoice
    console.log('Invoice Paid:', invoice.id)
  },

  [STRIPE_EVENTS.INVOICE_PAYMENT_ACTION_REQUIRED]: async (event) => {
    const invoice = event.data.object as Stripe.Invoice
    console.log('Invoice Payment Action Required:', invoice.id)
  },

  [STRIPE_EVENTS.INVOICE_PAYMENT_FAILED]: async (event) => {
    const invoice = event.data.object as Stripe.Invoice
    console.log('Invoice Payment Failed:', invoice.id)
  },

  [STRIPE_EVENTS.INVOICE_PAYMENT_SUCCEEDED]: async (event) => {
    const invoice = event.data.object as Stripe.Invoice
    console.log('Invoice Payment Succeeded:', invoice.id)
  },

  [STRIPE_EVENTS.INVOICE_SENT]: async (event) => {
    const invoice = event.data.object as Stripe.Invoice
    console.log('Invoice Sent:', invoice.id)
  },

  [STRIPE_EVENTS.INVOICE_UPCOMING]: async (event) => {
    const invoice = event.data.object as Stripe.Invoice
    console.log('Invoice Upcoming:', invoice.id)
  },

  [STRIPE_EVENTS.INVOICE_UPDATED]: async (event) => {
    const invoice = event.data.object as Stripe.Invoice
    console.log('Invoice Updated:', invoice.id)
  },

  [STRIPE_EVENTS.INVOICE_VOIDED]: async (event) => {
    const invoice = event.data.object as Stripe.Invoice
    console.log('Invoice Voided:', invoice.id)
  },

  // Payment Intent Events
  [STRIPE_EVENTS.PAYMENT_INTENT_AMOUNT_CAPTURABLE_UPDATED]: async (event) => {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log('Payment Intent Amount Capturable Updated:', paymentIntent.id)
  },

  [STRIPE_EVENTS.PAYMENT_INTENT_CANCELED]: async (event) => {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log('Payment Intent Canceled:', paymentIntent.id)
  },

  [STRIPE_EVENTS.PAYMENT_INTENT_CREATED]: async (event) => {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log('Payment Intent Created:', paymentIntent.id)
  },

  [STRIPE_EVENTS.PAYMENT_INTENT_PARTIALLY_FUNDED]: async (event) => {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log('Payment Intent Partially Funded:', paymentIntent.id)
  },

  [STRIPE_EVENTS.PAYMENT_INTENT_PAYMENT_FAILED]: async (event) => {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log('Payment Intent Failed:', paymentIntent.id)
  },

  [STRIPE_EVENTS.PAYMENT_INTENT_PROCESSING]: async (event) => {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log('Payment Intent Processing:', paymentIntent.id)
  },

  [STRIPE_EVENTS.PAYMENT_INTENT_REQUIRES_ACTION]: async (event) => {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log('Payment Intent Requires Action:', paymentIntent.id)
  },

  [STRIPE_EVENTS.PAYMENT_INTENT_SUCCEEDED]: async (event) => {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log('Payment Intent Succeeded:', paymentIntent.id)
  },

  // Payout Events
  [STRIPE_EVENTS.PAYOUT_CANCELED]: async (event) => {
    const payout = event.data.object as Stripe.Payout
    console.log('Payout Canceled:', payout.id)
  },

  [STRIPE_EVENTS.PAYOUT_CREATED]: async (event) => {
    const payout = event.data.object as Stripe.Payout
    console.log('Payout Created:', payout.id)
  },

  [STRIPE_EVENTS.PAYOUT_FAILED]: async (event) => {
    const payout = event.data.object as Stripe.Payout
    console.log('Payout Failed:', payout.id)
  },

  [STRIPE_EVENTS.PAYOUT_PAID]: async (event) => {
    const payout = event.data.object as Stripe.Payout
    console.log('Payout Paid:', payout.id)
  },

  [STRIPE_EVENTS.PAYOUT_UPDATED]: async (event) => {
    const payout = event.data.object as Stripe.Payout
    console.log('Payout Updated:', payout.id)
  },

  // Price Events
  [STRIPE_EVENTS.PRICE_CREATED]: async (event) => {
    const price = event.data.object as Stripe.Price
    console.log('Price Created:', price.id)
  },

  [STRIPE_EVENTS.PRICE_DELETED]: async (event) => {
    const price = event.data.object as Stripe.Price
    console.log('Price Deleted:', price.id)
  },

  [STRIPE_EVENTS.PRICE_UPDATED]: async (event) => {
    const price = event.data.object as Stripe.Price
    console.log('Price Updated:', price.id)
  },

  // Product Events
  [STRIPE_EVENTS.PRODUCT_CREATED]: async (event) => {
    const product = event.data.object as Stripe.Product
    console.log('Product Created:', product.id)
  },

  [STRIPE_EVENTS.PRODUCT_DELETED]: async (event) => {
    const product = event.data.object as Stripe.Product
    console.log('Product Deleted:', product.id)
  },

  [STRIPE_EVENTS.PRODUCT_UPDATED]: async (event) => {
    const product = event.data.object as Stripe.Product
    console.log('Product Updated:', product.id)
  },

  // Setup Intent Events
  [STRIPE_EVENTS.SETUP_INTENT_CANCELED]: async (event) => {
    const setupIntent = event.data.object as Stripe.SetupIntent
    console.log('Setup Intent Canceled:', setupIntent.id)
  },

  [STRIPE_EVENTS.SETUP_INTENT_CREATED]: async (event) => {
    const setupIntent = event.data.object as Stripe.SetupIntent
    console.log('Setup Intent Created:', setupIntent.id)
  },

  [STRIPE_EVENTS.SETUP_INTENT_REQUIRES_ACTION]: async (event) => {
    const setupIntent = event.data.object as Stripe.SetupIntent
    console.log('Setup Intent Requires Action:', setupIntent.id)
  },

  [STRIPE_EVENTS.SETUP_INTENT_SETUP_FAILED]: async (event) => {
    const setupIntent = event.data.object as Stripe.SetupIntent
    console.log('Setup Intent Failed:', setupIntent.id)
  },

  [STRIPE_EVENTS.SETUP_INTENT_SUCCEEDED]: async (event) => {
    const setupIntent = event.data.object as Stripe.SetupIntent
    console.log('Setup Intent Succeeded:', setupIntent.id)
  },

  // Subscription Schedule Events
  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_ABORTED]: async (event) => {
    const schedule = event.data.object as Stripe.SubscriptionSchedule
    console.log('Subscription Schedule Aborted:', schedule.id)
  },

  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_CANCELED]: async (event) => {
    const schedule = event.data.object as Stripe.SubscriptionSchedule
    console.log('Subscription Schedule Canceled:', schedule.id)
  },

  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_COMPLETED]: async (event) => {
    const schedule = event.data.object as Stripe.SubscriptionSchedule
    console.log('Subscription Schedule Completed:', schedule.id)
  },

  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_CREATED]: async (event) => {
    const schedule = event.data.object as Stripe.SubscriptionSchedule
    console.log('Subscription Schedule Created:', schedule.id)
  },

  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_EXPIRING]: async (event) => {
    const schedule = event.data.object as Stripe.SubscriptionSchedule
    console.log('Subscription Schedule Expiring:', schedule.id)
  },

  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_RELEASED]: async (event) => {
    const schedule = event.data.object as Stripe.SubscriptionSchedule
    console.log('Subscription Schedule Released:', schedule.id)
  },

  [STRIPE_EVENTS.SUBSCRIPTION_SCHEDULE_UPDATED]: async (event) => {
    const schedule = event.data.object as Stripe.SubscriptionSchedule
    console.log('Subscription Schedule Updated:', schedule.id)
  },

  // Tax Rate Events
  [STRIPE_EVENTS.TAX_RATE_CREATED]: async (event) => {
    const taxRate = event.data.object as Stripe.TaxRate
    console.log('Tax Rate Created:', taxRate.id)
  },

  [STRIPE_EVENTS.TAX_RATE_UPDATED]: async (event) => {
    const taxRate = event.data.object as Stripe.TaxRate
    console.log('Tax Rate Updated:', taxRate.id)
  },

  // Transfer Events
  [STRIPE_EVENTS.TRANSFER_CREATED]: async (event) => {
    const transfer = event.data.object as Stripe.Transfer
    console.log('Transfer Created:', transfer.id)
  },

  [STRIPE_EVENTS.TRANSFER_REVERSED]: async (event) => {
    const transfer = event.data.object as Stripe.Transfer
    console.log('Transfer Reversed:', transfer.id)
  },

  [STRIPE_EVENTS.TRANSFER_UPDATED]: async (event) => {
    const transfer = event.data.object as Stripe.Transfer
    console.log('Transfer Updated:', transfer.id)
  },
}

export async function handleStripeWebhook(
  event: Stripe.Event
): Promise<{ success: boolean; message?: string }> {
  const handler = webhookHandlers[event.type as StripeEventType]

  if (!handler) {
    console.log(`No handler found for event type: ${event.type}`)
    return { success: true, message: 'Event type not handled' }
  }

  try {
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
