'use client'

import {
  Card,
  CardHeader,
  CardContent,
} from '@rabbit/design-system/components/ui/card'
import { Badge } from '@rabbit/design-system/components/ui/badge'
import { CreditCard, CheckCircle2, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { Subscription } from '@rabbit/stripe/lib/subscription'
import { PricingTier } from '@rabbit/design-system/components/site/pricing/pricing-data'
import { formatCurrency } from './format-currency'
import { cn } from '@rabbit/design-system/lib/utils'

interface CurrentSubscriptionProps {
  subscription: Subscription | null | undefined
  currentPlan: PricingTier | undefined
}

export function CurrentSubscription({
  subscription,
  currentPlan,
}: CurrentSubscriptionProps) {
  function formatDate(date: Date | number) {
    const dateObj = typeof date === 'number' ? new Date(date * 1000) : date
    return format(dateObj, 'MMMM d, yyyy')
  }

  const isYearly = subscription?.interval === 'year'
  const price = currentPlan
    ? isYearly
      ? currentPlan.yearlyPrice
      : currentPlan.monthlyPrice
    : null
  const isFree = price === null || price === 0
  const isActive = subscription?.status === 'active'

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/5 pb-8">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Current Plan
            </p>
            <h3 className="text-2xl font-semibold tracking-tight">
              {currentPlan?.title}
            </h3>
            {!isFree && subscription && (
              <div className="mt-1 text-xl font-bold">
                {formatCurrency(price, subscription.currency)}
                <span className="text-base font-normal text-muted-foreground">
                  /{subscription.interval || 'month'}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-2 text-right">
            <Badge
              variant={isActive ? 'default' : 'secondary'}
              className={cn(
                'gap-1',
                isActive &&
                  'bg-green-500/15 text-green-600 hover:bg-green-500/25'
              )}
            >
              {isActive ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5" />
              )}
              {isFree ? 'Free Plan' : isActive ? 'Active' : 'Inactive'}
            </Badge>
            {subscription?.paymentMethod && (
              <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>•••• {subscription.paymentMethod.last4}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {subscription && !isFree && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Current period ends on{' '}
              <span className="font-medium text-foreground">
                {formatDate(subscription.currentPeriodEnd)}
              </span>
            </p>
            {subscription.cancelAtPeriodEnd && (
              <div className="flex items-center gap-1.5 text-sm font-medium text-destructive">
                <AlertCircle className="h-4 w-4" />
                Your subscription will end on{' '}
                {formatDate(subscription.currentPeriodEnd)}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
