'use client'

import { useState } from 'react'
import { pricingTiers } from '@rabbit/design-system/components/site/pricing/pricing-data'
import { Subscription } from '@rabbit/stripe/lib/subscription'
import { toast } from 'sonner'
import { postStripeSession } from '@rabbit/design-system/actions/stripe/stripe-session'
import useUser from '@rabbit/design-system/hooks/use-user'
import { CurrentSubscription } from './current-subscription'
import { PricingTierCard } from './pricing-tier-card'

interface BillingProps {
  subscription?: Subscription | null
}

export function Billing({ subscription }: BillingProps) {
  const [isLoading, setIsLoading] = useState(false)
  const user = useUser()

  const currentPlan = pricingTiers.find(
    (tier) => tier.plan === (subscription?.plan || 'free')
  )

  async function handleUpgrade(priceId: string) {
    if (!user) {
      toast.error('You must be logged in to upgrade')
      return
    }

    try {
      setIsLoading(true)
      await postStripeSession({
        user,
        priceId,
        plan: currentPlan?.plan || 'free',
      })
    } catch (error) {
      toast.error('Failed to create checkout session')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col divide-y">
      <section className="px-4 pt-2 pb-4">
        <div className="mb-4">
          <h2 className="text-lg font-bold font-heading">Current Plan</h2>
          <p className="text-sm text-muted-foreground">
            View and manage your current subscription
          </p>
        </div>
        <CurrentSubscription
          subscription={subscription}
          currentPlan={currentPlan}
        />
      </section>

      <section className="px-4 pt-2 pb-4">
        <div className="mb-4">
          <h2 className="text-lg font-bold font-heading">Available Plans</h2>
          <p className="text-sm text-muted-foreground">
            Compare plans and choose the best option for you
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingTierCard
              key={tier.title}
              tier={tier}
              subscription={subscription}
              isLoading={isLoading}
              onUpgrade={handleUpgrade}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
