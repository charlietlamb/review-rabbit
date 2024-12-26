import Stripe from 'stripe'
import { env } from '@remio/env'
import { AppOpenAPI } from './types'
import { db } from '@remio/database'
import {
  users,
  customers,
  payments,
  subscriptions,
} from '@remio/database/schema'
import { eq } from 'drizzle-orm'
import { HttpStatusCodes } from '@remio/http'

const PLAN_PRICE_MAP = {
  basic: env.NEXT_PUBLIC_STRIPE_PLAN_1_PRICE_ID,
  pro: env.NEXT_PUBLIC_STRIPE_PLAN_2_PRICE_ID,
  enterprise: env.NEXT_PUBLIC_STRIPE_PLAN_3_PRICE_ID,
} as const

export default async function configureStripe(app: AppOpenAPI) {
  app.post('/webhook', async (context) => {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY)
    const signature = context.req.header('stripe-signature')
    try {
      if (!signature) {
        return context.text(
          'Stripe signature required',
          HttpStatusCodes.BAD_REQUEST
        )
      }
      const body = await context.req.text()
      const event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      )

      const logger = context.get('logger')
      logger.info(`Processing Stripe webhook event: ${event.type}`)

      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated': {
          const subscription = event.data.object as Stripe.Subscription
          const customerId = subscription.customer as string

          // Find our customer
          const customer = await db
            .select()
            .from(customers)
            .where(eq(customers.stripeCustomerId, customerId))
            .execute()
            .then((rows) => rows[0])

          if (!customer) {
            logger.error('Customer not found for subscription', { customerId })
            return context.text(
              'Customer not found',
              HttpStatusCodes.BAD_REQUEST
            )
          }

          // Update subscription in our database
          await db
            .insert(subscriptions)
            .values({
              id: subscription.id,
              customerId: customer.id,
              stripeSubscriptionId: subscription.id,
              status: subscription.status,
              priceId: subscription.items.data[0].price.id,
              quantity: subscription.items.data[0].quantity || 1,
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
              cancelAt: subscription.cancel_at
                ? new Date(subscription.cancel_at * 1000)
                : null,
              canceledAt: subscription.canceled_at
                ? new Date(subscription.canceled_at * 1000)
                : null,
              currentPeriodStart: new Date(
                subscription.current_period_start * 1000
              ),
              currentPeriodEnd: new Date(
                subscription.current_period_end * 1000
              ),
              endedAt: subscription.ended_at
                ? new Date(subscription.ended_at * 1000)
                : null,
              trialStart: subscription.trial_start
                ? new Date(subscription.trial_start * 1000)
                : null,
              trialEnd: subscription.trial_end
                ? new Date(subscription.trial_end * 1000)
                : null,
            })
            .onConflictDoUpdate({
              target: subscriptions.stripeSubscriptionId,
              set: {
                status: subscription.status,
                cancelAtPeriodEnd: subscription.cancel_at_period_end,
                cancelAt: subscription.cancel_at
                  ? new Date(subscription.cancel_at * 1000)
                  : null,
                canceledAt: subscription.canceled_at
                  ? new Date(subscription.canceled_at * 1000)
                  : null,
                currentPeriodStart: new Date(
                  subscription.current_period_start * 1000
                ),
                currentPeriodEnd: new Date(
                  subscription.current_period_end * 1000
                ),
                endedAt: subscription.ended_at
                  ? new Date(subscription.ended_at * 1000)
                  : null,
                updatedAt: new Date(),
              },
            })

          // Update user's plan based on the price
          const priceId = subscription.items.data[0].price.id
          let plan: string = 'free'

          // Map price IDs to plans
          Object.entries(PLAN_PRICE_MAP).forEach(([planName, planPriceId]) => {
            if (priceId === planPriceId) {
              plan = planName
            }
          })

          if (subscription.status === 'active') {
            await db
              .update(users)
              .set({
                plan,
                updatedAt: new Date(),
              })
              .where(eq(users.id, customer.userId))
          }
          break
        }

        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription
          const customerId = subscription.customer as string

          const customer = await db
            .select()
            .from(customers)
            .where(eq(customers.stripeCustomerId, customerId))
            .execute()
            .then((rows) => rows[0])

          if (!customer) {
            logger.error('Customer not found for subscription deletion', {
              customerId,
            })
            return context.text(
              'Customer not found',
              HttpStatusCodes.BAD_REQUEST
            )
          }

          // Update subscription status
          await db
            .update(subscriptions)
            .set({
              status: 'canceled',
              canceledAt: new Date(),
              endedAt: new Date(),
              updatedAt: new Date(),
            })
            .where(eq(subscriptions.stripeSubscriptionId, subscription.id))

          // Downgrade user to free plan
          await db
            .update(users)
            .set({
              plan: 'free',
              updatedAt: new Date(),
            })
            .where(eq(users.id, customer.userId))
          break
        }

        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent
          const customerId = paymentIntent.customer as string

          const customer = await db
            .select()
            .from(customers)
            .where(eq(customers.stripeCustomerId, customerId))
            .execute()
            .then((rows) => rows[0])

          if (!customer) {
            logger.error('Customer not found for payment', { customerId })
            return context.text(
              'Customer not found',
              HttpStatusCodes.BAD_REQUEST
            )
          }

          // Find associated subscription
          const subscription = paymentIntent.invoice
            ? await db
                .select()
                .from(subscriptions)
                .where(
                  eq(
                    subscriptions.stripeSubscriptionId,
                    paymentIntent.invoice as string
                  )
                )
                .execute()
                .then((rows) => rows[0])
            : null

          if (!subscription) {
            logger.error('Subscription not found for payment', {
              customerId,
              paymentIntentId: paymentIntent.id,
            })
            return context.text(
              'Subscription not found',
              HttpStatusCodes.BAD_REQUEST
            )
          }

          // Record the payment
          const paymentData = {
            id: crypto.randomUUID(),
            stripePaymentIntentId: paymentIntent.id,
            customerId: customer.id,
            subscriptionId: subscription.id, // This is required by the schema
            amount: (paymentIntent.amount / 100).toString(),
            currency: paymentIntent.currency,
            status: 'succeeded' as const,
            paymentMethod: paymentIntent.payment_method_types[0],
            receiptEmail: paymentIntent.receipt_email || undefined,
            receiptUrl: undefined,
            failureMessage: undefined,
            createdAt: new Date(paymentIntent.created * 1000),
            updatedAt: new Date(),
          }

          await db.insert(payments).values(paymentData)
          break
        }

        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent
          const customerId = paymentIntent.customer as string

          const customer = await db
            .select()
            .from(customers)
            .where(eq(customers.stripeCustomerId, customerId))
            .execute()
            .then((rows) => rows[0])

          if (!customer) {
            logger.error('Customer not found for failed payment', {
              customerId,
            })
            return context.text(
              'Customer not found',
              HttpStatusCodes.BAD_REQUEST
            )
          }

          // Find associated subscription
          const subscription = paymentIntent.invoice
            ? await db
                .select()
                .from(subscriptions)
                .where(
                  eq(
                    subscriptions.stripeSubscriptionId,
                    paymentIntent.invoice as string
                  )
                )
                .execute()
                .then((rows) => rows[0])
            : null

          if (!subscription) {
            logger.error('Subscription not found for failed payment', {
              customerId,
              paymentIntentId: paymentIntent.id,
            })
            return context.text(
              'Subscription not found',
              HttpStatusCodes.BAD_REQUEST
            )
          }

          // Record the failed payment
          const paymentData = {
            id: crypto.randomUUID(),
            stripePaymentIntentId: paymentIntent.id,
            customerId: customer.id,
            subscriptionId: subscription.id, // This is required by the schema
            amount: (paymentIntent.amount / 100).toString(),
            currency: paymentIntent.currency,
            status: 'failed' as const,
            paymentMethod: paymentIntent.payment_method_types[0],
            receiptEmail: paymentIntent.receipt_email || undefined,
            receiptUrl: undefined,
            failureMessage:
              paymentIntent.last_payment_error?.message || undefined,
            createdAt: new Date(paymentIntent.created * 1000),
            updatedAt: new Date(),
          }

          await db.insert(payments).values(paymentData)
          break
        }

        case 'customer.created': {
          const customer = event.data.object as Stripe.Customer

          // We might want to create a customer record if it doesn't exist
          // However, typically we create our customer record first, then the Stripe customer
          logger.info('Stripe customer created', {
            stripeCustomerId: customer.id,
            email: customer.email,
          })
          break
        }

        default:
          logger.info(`Unhandled event type: ${event.type}`)
      }

      return context.text('Webhook processed successfully', HttpStatusCodes.OK)
    } catch (err) {
      const errorMessage = `⚠️  Webhook error: ${
        err instanceof Error ? err.message : 'Internal server error'
      }`
      context.get('logger').error(errorMessage)
      return context.text(errorMessage, HttpStatusCodes.BAD_REQUEST)
    }
  })
}
