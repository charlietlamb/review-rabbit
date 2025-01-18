'use client'

import { Card } from '@rabbit/design-system/components/ui/card'
import { Button } from '@rabbit/design-system/components/ui/button'
import { Separator } from '@rabbit/design-system/components/ui/separator'
import { Check, X, Loader2 } from 'lucide-react'
import {
  PricingTier,
  features,
  PlanAvailability,
} from '@rabbit/design-system/components/site/pricing/pricing-data'
import { Plan } from '@rabbit/hono/lib/types'
import { Subscription } from '@rabbit/stripe/lib/subscription'
import { formatCurrency } from './format-currency'

interface PricingTierCardProps {
  tier: PricingTier
  subscription: Subscription | null | undefined
  isLoading: boolean
  onUpgrade: (priceId: string) => void
}

export function PricingTierCard({
  tier,
  subscription,
  isLoading,
  onUpgrade,
}: PricingTierCardProps) {
  function getPlanAvailability(
    availability: PlanAvailability,
    plan: Plan
  ): boolean {
    switch (plan) {
      case 'free':
        return availability.free
      case 'basic':
        return availability.basic
      case 'pro':
        return availability.pro
      case 'enterprise':
        return availability.pro // Enterprise users get all pro features
      default:
        return false
    }
  }

  const isFree = tier.price === null || tier.price === 0

  return (
    <Card
      className={`p-6 ${tier.highlighted ? 'border-primary shadow-md' : ''}`}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold">{tier.title}</h3>
          <p className="text-3xl font-bold">
            {formatCurrency(tier.price, subscription?.currency)}
            {!isFree && (
              <span className="text-base font-normal text-muted-foreground">
                /month
              </span>
            )}
          </p>
        </div>

        <Separator />

        <ul className="space-y-2">
          {Object.entries(features).map(([feature, availability]) => {
            const isAvailable = getPlanAvailability(
              availability as PlanAvailability,
              tier.plan
            )
            return (
              <li key={feature} className="flex items-center text-sm">
                {isAvailable ? (
                  <Check className="mr-2 h-4 w-4 text-primary" />
                ) : (
                  <X className="mr-2 h-4 w-4 text-muted-foreground" />
                )}
                {feature}
              </li>
            )
          })}
        </ul>

        {tier.priceId && (
          <Button
            className="w-full"
            disabled={
              isLoading ||
              subscription?.plan === tier.plan ||
              (subscription?.status === 'active' && tier.plan === 'free')
            }
            onClick={() => onUpgrade(tier.priceId!)}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : subscription?.plan === tier.plan ? (
              'Current Plan'
            ) : (
              tier.buttonText
            )}
          </Button>
        )}
      </div>
    </Card>
  )
}
