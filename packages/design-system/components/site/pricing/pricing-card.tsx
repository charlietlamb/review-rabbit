'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@rabbit/design-system/components/ui/card'
import { PricingTier, features, PlanAvailability } from './pricing-data'
import { Button } from '@rabbit/design-system/components/ui/button'
import { ArrowRight, Check, X } from 'lucide-react'
import { checkout } from '@rabbit/design-system/actions/stripe/checkout'
import { cn } from '@rabbit/design-system/lib/utils'
import { useRouter } from 'next/navigation'
import { authClient } from '@rabbit/design-system/lib/auth-client'
import { getEnv } from '@rabbit/env'
import { User } from '@rabbit/database'
import { Plan } from '@rabbit/hono/lib/types'
import { NumberTicker } from './number-ticker'
import { motion, AnimatePresence } from 'framer-motion'

function isValidUser(user: any): user is User {
  return (
    typeof user === 'object' &&
    user !== null &&
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string'
  )
}

function hasFeature(availability: PlanAvailability, plan: Plan): boolean {
  return plan === 'enterprise' || availability[plan]
}

export function PricingCard({
  tier,
  isYearly,
}: {
  tier: PricingTier
  isYearly: boolean
}) {
  const isPro = tier.highlighted
  const isEnterprise = tier.title === 'Enterprise'
  const { data: session } = authClient.useSession()
  const router = useRouter()

  const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice
  const priceId = isYearly ? tier.yearlyPriceId : tier.monthlyPriceId
  const displayPrice = price ?? 0

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
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-12 right-6 rounded-full bg-primary/90 px-3 py-1 text-xs text-background font-heading font-bold z-50"
          >
            Popular
          </motion.span>
        )}
        <CardTitle className="font-heading text-2xl">{tier.title}</CardTitle>
        <div className="text-3xl font-bold">
          {isEnterprise ? (
            <p className="text-muted-foreground font-normal">Custom Pricing</p>
          ) : (
            <motion.div
              layout
              className="flex flex-col"
              transition={{ duration: 0.3 }}
            >
              <motion.div layout className="flex items-baseline gap-1">
                <NumberTicker
                  value={displayPrice}
                  prefix="£"
                  className="tabular-nums"
                />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isYearly ? 'yearly' : 'monthly'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm font-normal text-muted-foreground/80"
                  >
                    / {isYearly ? 'year' : 'month'}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
              <AnimatePresence>
                {isYearly && displayPrice > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm font-normal text-muted-foreground/80"
                  >
                    <NumberTicker
                      value={Math.round(displayPrice / 12)}
                      prefix="£"
                      suffix=" per month"
                      className="tabular-nums"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </CardHeader>
      <CardContent className="relative z-10 flex-grow">
        <p className="text-muted-foreground/80 mb-4">{tier.description}</p>
        <div>
          <h4 className="font-medium mb-2">Features:</h4>
          <ul className="space-y-2">
            {isEnterprise
              ? Object.keys(features).map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-foreground/80">{feature}</span>
                  </motion.li>
                ))
              : Object.entries(features).map(
                  ([feature, availability], index) => {
                    const isIncluded = hasFeature(availability, tier.plan)
                    return (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        {isIncluded ? (
                          <Check className="mr-2 h-4 w-4 text-primary" />
                        ) : (
                          <X className="mr-2 h-4 w-4 text-muted-foreground/70" />
                        )}
                        <span
                          className={cn(
                            isIncluded
                              ? 'text-foreground/80'
                              : 'text-muted-foreground/70'
                          )}
                        >
                          {feature}
                        </span>
                      </motion.li>
                    )
                  }
                )}
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
            } else if (session?.user && isValidUser(session.user)) {
              const user: User = {
                ...session.user,
                currency: 'gbp',
                imageExpiresAt: session.user.imageExpiresAt
                  ? new Date(session.user.imageExpiresAt)
                  : null,
                createdAt: new Date(session.user.createdAt || Date.now()),
                updatedAt: new Date(session.user.updatedAt || Date.now()),
              }
              if (priceId) {
                checkout(user, priceId, tier.plan)
              } else {
                router.push('/signup')
              }
            } else {
              router.push('/signup')
            }
          }}
        >
          {tier.buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
