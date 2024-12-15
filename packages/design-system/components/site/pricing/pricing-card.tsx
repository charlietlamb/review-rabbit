'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@remio/design-system/components/ui/card'
import { PricingTier } from './pricing-data'
import { Button } from '@remio/design-system/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'
import { checkout } from '@remio/design-system/actions/stripe/checkout'
import { cn } from '@remio/design-system/lib/utils'

export function PricingCard({ tier }: { tier: PricingTier }) {
  const isPro = tier.title === 'Pro'

  return (
    <Card
      className={cn(
        'relative flex flex-col overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-600',
        'before:absolute before:inset-0 before:rounded-[calc(var(--radius)+1px)] before:p-[1px]',
        'before:bg-gradient-to-b before:from-primary/20 before:to-secondary/20',
        'after:absolute after:inset-[1px] after:rounded-[var(--radius)] after:bg-gradient-to-b after:from-background/90 after:to-background/50',
        'hover:before:from-primary/30 hover:before:to-secondary/30 transition-all duration-300',
        isPro && [
          'md:scale-105',
          'before:from-primary/40 before:to-secondary/40',
          'hover:before:from-primary/50 hover:before:to-secondary/50',
          'shadow-xl shadow-primary/20',
          'z-10',
        ]
      )}
    >
      <CardHeader className="relative z-10">
        {isPro && (
          <span className="absolute top-12 right-6 rounded-full bg-primary/90 px-3 py-1 text-xs text-background font-heading font-bold z-50">
            Popular
          </span>
        )}
        <CardTitle className="font-heading text-2xl">{tier.title}</CardTitle>
        <div className="text-3xl font-bold">
          ${tier.price}
          <span className="text-sm font-normal text-muted-foreground/80">
            / month
          </span>
        </div>
      </CardHeader>
      <CardContent className="relative z-10 flex-grow">
        <p className="text-muted-foreground/80 mb-4">{tier.description}</p>
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span className="text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="relative z-10 pb-6">
        <Button
          size="lg"
          variant="expandIcon"
          colors="primary"
          Icon={ArrowRight}
          iconPlacement="right"
          className={cn(
            'w-full transition-colors font-heading font-bold',
            isPro
              ? 'bg-primary hover:bg-primary/90'
              : 'bg-primary/90 hover:bg-primary/100'
          )}
          onClick={() => checkout(tier.priceId, tier.plan)}
        >
          {tier.buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
