'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@rabbit/design-system/components/ui/card'
import { PricingTier } from './pricing-data'
import { Button } from '@rabbit/design-system/components/ui/button'
import { ArrowRight, Check, X } from 'lucide-react'
import { checkout } from '@rabbit/design-system/actions/stripe/checkout'
import { cn } from '@rabbit/design-system/lib/utils'
import { useRouter } from 'next/navigation'
import { authClient } from '@rabbit/design-system/lib/authClient'
import { getEnv } from '@rabbit/env'
function getFeaturesToShow(
  currentTier: PricingTier,
  pricingTiers: PricingTier[]
): { feature: string; included: boolean }[] {
  if (currentTier.title === 'Basic') {
    const proTier = pricingTiers.find((tier) => tier.title === 'Pro')
    if (!proTier) return []
    const includedFeatures = currentTier.features.map((feature) => ({
      feature,
      included: true,
    }))
    const missingFeatures = proTier.features
      .filter((feature) => !currentTier.features.includes(feature))
      .map((feature) => ({
        feature,
        included: false,
      }))
    return [...includedFeatures, ...missingFeatures]
  } else {
    return currentTier.features.map((feature) => ({
      feature,
      included: true,
    }))
  }
}

export function PricingCard({
  tier,
  allTiers,
}: {
  tier: PricingTier
  allTiers: PricingTier[]
}) {
  const isPro = tier.title === 'Pro'
  const isEnterprise = tier.title === 'Enterprise'
  const features = getFeaturesToShow(tier, allTiers)
  const { data: session } = authClient.useSession()
  const router = useRouter()

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
          {isEnterprise ? (
            <p className="text-muted-foreground font-normal">Custom Pricing</p>
          ) : (
            <>
              £{tier.price}
              <span className="text-sm font-normal text-muted-foreground/80">
                / month
              </span>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="relative z-10 flex-grow">
        <p className="text-muted-foreground/80 mb-4">{tier.description}</p>
        <div>
          <h4 className="font-medium mb-2">Features:</h4>
          <ul className="space-y-2">
            {features.map(({ feature, included }, index) => (
              <li key={index} className="flex items-center">
                {included ? (
                  <Check className="mr-2 h-4 w-4 text-primary" />
                ) : (
                  <X className="mr-2 h-4 w-4 text-muted-foreground/70" />
                )}
                <span
                  className={cn(
                    included ? 'text-foreground/80' : 'text-muted-foreground/70'
                  )}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
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
          onClick={() => {
            if (isEnterprise) {
              window.open(
                `mailto:contact@${getEnv().NEXT_PUBLIC_DOMAIN}`,
                '_blank'
              )
            } else {
              if (session?.user) {
                checkout(tier.priceId, tier.plan)
              } else {
                router.push('/signup')
              }
            }
          }}
        >
          {tier.buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
