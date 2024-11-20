'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { PricingTier } from './pricing-data'
import { Button } from '@/components/ui/button'
import { Check, Gift } from 'lucide-react'
import { checkout } from '@/actions/stripe/checkout'

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-heading text-2xl">{tier.title}</CardTitle>
        <div className="text-3xl font-bold">
          ${tier.price}
          <span className="text-sm font-normal text-muted-foreground">
            / month
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{tier.description}</p>
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto flex-grow flex flex-col justify-end">
        <Button
          size="lg"
          variant="expandIcon"
          Icon={Gift}
          iconPlacement="right"
          className="w-full"
          onClick={() => checkout(tier.priceId, tier.plan)}
        >
          {tier.buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
