'use client'

import { motion } from 'framer-motion'
import { pricingTiers } from './pricing-data'
import { PricingCard } from './pricing-card'
import PricingCta from './pricing-cta'
import { Faq } from '../index/faq/faq-section'
import { Button } from '@rabbit/design-system/components/ui/button'
import { cn } from '@rabbit/design-system/lib/utils'
import { ArrowRight } from 'lucide-react'

export function Pricing() {
  return (
    <div className="container flex flex-col px-8 py-16 mx-auto">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-primary font-bold text-center uppercase"
      >
        Pricing
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-heading mb-2 text-4xl font-bold text-center text-foreground"
      >
        Choose Your Plan
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-muted-foreground mb-8 text-center"
      >
        Choose the plan that best suits your needs.
      </motion.p>
      <div className="md:grid-cols-3 grid grid-cols-1 gap-8 py-8">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="h-full"
          >
            <div className="h-full flex-1">
              <PricingCard tier={tier} allTiers={pricingTiers} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="w-full pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={cn(
            'relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-600 py-12',
            'before:absolute before:inset-0 before:rounded-[calc(var(--radius)+1px)] before:p-[1px]',
            'before:bg-gradient-to-b before:from-primary/40 before:to-secondary/40',
            'after:absolute after:inset-[1px] after:rounded-[var(--radius)] after:bg-gradient-to-b after:from-background/90 after:to-background/50',
            'hover:before:from-primary/50 hover:before:to-secondary/50',
            'shadow-xl shadow-primary/20',
            'z-10'
          )}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 px-8 md:px-16">
            <div className="flex flex-col items-start text-left">
              <h2 className="font-heading text-3xl font-bold mb-2">
                Enterprise
              </h2>
              <p className="text-muted-foreground text-lg">
                Need a custom solution? Let's talk about your specific needs.
              </p>
            </div>
            <Button
              size="lg"
              variant="expandIcon"
              colors="primary"
              Icon={ArrowRight}
              iconPlacement="right"
              className="bg-primary hover:bg-primary/90 font-heading font-bold min-w-[200px]"
              onClick={() =>
                (window.location.href = 'mailto:charlie@reviewrabbit.uk')
              }
            >
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Faq />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <PricingCta />
      </motion.div>
    </div>
  )
}
