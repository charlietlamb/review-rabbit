'use client'

import { useState } from 'react'
import { pricingTiers } from '@rabbit/design-system/components/site/pricing/pricing-data'
import { toast } from 'sonner'
import { postStripeSession } from '@rabbit/design-system/actions/stripe/stripe-session'
import { postBillingPortalSession } from '@rabbit/design-system/actions/stripe/billing-portal-session'
import useUser from '@rabbit/design-system/hooks/use-user'
import { CurrentSubscription } from './current-subscription'
import { PricingTierCard } from './pricing-tier-card'
import { Button } from '@rabbit/design-system/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { stripeDetailsAtom } from '@rabbit/design-system/atoms/user/user-atom'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { Plan } from '@rabbit/hono/lib/types'

export function Billing() {
  const subscription = useAtomValue(stripeDetailsAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [upgradingPlan, setUpgradingPlan] = useState<Plan | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isYearly, setIsYearly] = useState(false)
  const router = useRouter()
  const user = useUser()

  const currentPlan = pricingTiers.find(
    (tier) => tier.plan === (subscription?.plan || 'free')
  )

  const availableTiers = pricingTiers.filter((tier) => {
    const currentIndex = pricingTiers.findIndex(
      (t) => t.plan === (subscription?.plan || 'free')
    )
    const tierIndex = pricingTiers.findIndex((t) => t.plan === tier.plan)
    return tierIndex > currentIndex
  })

  async function handleUpgrade(priceId: string, plan: Plan) {
    if (!user) {
      toast.error('You must be logged in to upgrade')
      return
    }

    try {
      setIsLoading(true)
      setUpgradingPlan(plan)
      await postStripeSession({
        user,
        priceId,
        plan: currentPlan?.plan || 'free',
      })
    } catch (error) {
      toast.error('Failed to create checkout session')
    } finally {
      setIsLoading(false)
      setUpgradingPlan(null)
    }
  }

  async function handleManageSubscription() {
    if (!subscription) {
      toast.error('You must be subscribed to manage your subscription', {
        description: 'Upgrade to a plan to manage your subscription',
      })
      return
    }

    try {
      setIsRedirecting(true)
      const url = await postBillingPortalSession(subscription.customerId)
      console.log(url)
      router.push(url)
    } catch (error) {
      toast.error('Failed to open billing portal')
    } finally {
      setIsRedirecting(false)
    }
  }

  return (
    <div className="flex flex-col divide-y">
      <section className="px-4 pt-2 pb-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-heading">Current Plan</h2>
            <p className="text-sm text-muted-foreground">
              View and manage your current subscription
            </p>
          </div>
          {subscription?.status === 'active' && (
            <Button
              variant="outline"
              onClick={handleManageSubscription}
              className="flex items-center gap-2"
              disabled={isRedirecting}
            >
              {isRedirecting ? (
                <Spinner />
              ) : (
                <>
                  Manage Subscription
                  <ExternalLink className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
        <CurrentSubscription
          subscription={subscription}
          currentPlan={currentPlan}
        />
      </section>

      {availableTiers.length > 0 && (
        <section className="px-4 pt-2 pb-4">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-heading">
                  Upgrade Options
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose a plan that better suits your needs
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-1">
                <Button
                  variant={isYearly ? 'ghost' : 'default'}
                  size="sm"
                  onClick={() => setIsYearly(false)}
                >
                  Monthly
                </Button>
                <Button
                  variant={isYearly ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setIsYearly(true)}
                >
                  Yearly
                </Button>
              </div>
            </div>
          </div>
          <div
            className={`grid gap-4 ${availableTiers.length === 1 ? '' : 'md:grid-cols-2'}`}
          >
            {availableTiers.map((tier) => (
              <PricingTierCard
                key={tier.title}
                tier={tier}
                subscription={subscription}
                isLoading={isLoading && upgradingPlan === tier.plan}
                onUpgrade={(priceId) => handleUpgrade(priceId, tier.plan)}
                isYearly={isYearly}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
