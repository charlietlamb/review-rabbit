import Stripe from 'stripe'
import { db } from '@burse/database/postgres'
import { taxRates } from '@burse/database/schema/wh/tax-rates'
import { stripeConnects } from '@burse/database/schema/stripe/stripe-connects'
import { eq } from 'drizzle-orm'

export const handleTaxRateUpdated = async (event: Stripe.Event) => {
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

    // Get the existing tax rate
    const existingTaxRate = await db.query.taxRates.findFirst({
      where: eq(taxRates.stripeId, taxRate.id),
    })

    if (!existingTaxRate) {
      throw new Error(`No Tax Rate found with ID: ${taxRate.id}`)
    }

    // Update the tax rate record
    await db
      .update(taxRates)
      .set({
        active: taxRate.active,
        description: taxRate.description,
        displayName: taxRate.display_name,
        taxType: taxRate.tax_type,
        updatedAt: new Date(),
      })
      .where(eq(taxRates.stripeId, taxRate.id))
  } catch (error) {
    console.error('Error handling tax.rate.updated event:', error)
    throw error
  }
}
