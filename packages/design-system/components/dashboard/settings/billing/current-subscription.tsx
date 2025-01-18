'use client'

import { Card } from '@rabbit/design-system/components/ui/card'
import { Badge } from '@rabbit/design-system/components/ui/badge'
import { CreditCard } from 'lucide-react'
import { format } from 'date-fns'
import { Subscription } from '@rabbit/stripe/lib/subscription'
import { PricingTier } from '@rabbit/design-system/components/site/pricing/pricing-data'
import { formatCurrency } from './format-currency'

interface CurrentSubscriptionProps {
  subscription: Subscription | null | undefined
  currentPlan: PricingTier | undefined
}

export function CurrentSubscription({
  subscription,
  currentPlan,
}: CurrentSubscriptionProps) {
  function formatDate(date: Date) {
    return format(date, 'MMMM d, yyyy')
  }

  const price = currentPlan?.price ?? null
  const isFree = price === null || price === 0

  return (
    <Card className="p-4">
      <div className="flex items-center justify-end">
        <Badge
          variant={subscription?.status === 'active' ? 'default' : 'secondary'}
        >
          {subscription?.status === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      {subscription && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Current Plan</p>
              <p className="text-2xl font-bold">
                {currentPlan?.title}{' '}
                <span className="text-muted-foreground">
                  {formatCurrency(price, subscription.currency)}
                  {!isFree && '/month'}
                </span>
              </p>
            </div>
            {subscription.paymentMethod && (
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">
                  •••• {subscription.paymentMethod.last4}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Current period ends on {formatDate(subscription.currentPeriodEnd)}
            </p>
            {subscription.cancelAtPeriodEnd && (
              <p className="text-sm font-medium text-destructive">
                Your subscription will end on{' '}
                {formatDate(subscription.currentPeriodEnd)}
              </p>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
