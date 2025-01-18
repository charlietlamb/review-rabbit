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
  function formatDate(date: Date | number) {
    // Convert Unix timestamp (seconds) to milliseconds for Date object
    const dateObj = typeof date === 'number' ? new Date(date * 1000) : date
    return format(dateObj, 'MMMM d, yyyy')
  }

  const price = currentPlan?.monthlyPrice ?? null
  const isFree = price === null || price === 0

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Current Plan</p>
            <p className="text-2xl font-bold">
              {currentPlan?.title}{' '}
              {!isFree && subscription && (
                <span className="text-muted-foreground">
                  {formatCurrency(price, subscription.currency)}/
                  {subscription.interval || 'month'}
                </span>
              )}
            </p>
          </div>
          <div className="space-y-2 text-right">
            <Badge
              variant={
                subscription?.status === 'active' ? 'default' : 'secondary'
              }
            >
              {isFree
                ? 'Free Plan'
                : subscription?.status === 'active'
                  ? 'Active'
                  : 'Inactive'}
            </Badge>
            {subscription?.paymentMethod && (
              <div className="flex items-center justify-end space-x-2">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">
                  •••• {subscription.paymentMethod.last4}
                </span>
              </div>
            )}
          </div>
        </div>

        {subscription && !isFree && (
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
        )}
      </div>
    </Card>
  )
}
