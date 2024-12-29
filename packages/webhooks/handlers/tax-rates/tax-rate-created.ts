import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { taxRates } from '@burse/database/schema/wh/tax-rates'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleTaxRateCreated = async (event: Stripe.Event) => {
  try {
    const taxRate = event.data.object as Stripe.TaxRate

    // Get the Stripe Connect account
    const stripeConnect = await db.query.stripeConnects.findFirst({
      where: eq(stripeConnects.id, event.account!),
    })

    if (!stripeConnect) {
      throw new Error(
        `No Stripe Connect account found for ID: ${event.account}`
      )
    }

    // Check if tax rate already exists
    const existingTaxRate = await db.query.taxRates.findFirst({
      where: eq(taxRates.stripeId, taxRate.id),
    })

    if (existingTaxRate) {
      throw new Error(`Tax Rate already exists with ID: ${taxRate.id}`)
    }

    // Create the tax rate record
    await db.insert(taxRates).values({
      id: taxRate.id,
      userId: stripeConnect.userId,
      stripeId: taxRate.id,
      displayName: taxRate.display_name,
      description: taxRate.description,
      jurisdiction: taxRate.jurisdiction,
      percentage: taxRate.percentage.toString(),
      inclusive: taxRate.inclusive,
      active: taxRate.active,
      country: taxRate.country,
      state: taxRate.state,
      taxType: taxRate.tax_type,
    })
  } catch (error) {
    console.error('Error handling tax.rate.created event:', error)
    throw error
  }
}
