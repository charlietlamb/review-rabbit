'use client'

import { motion } from 'framer-motion'
import { pricingTiers } from './pricing-data'
import { PricingCard } from './pricing-card'
import PricingCta from './pricing-cta'
import { Faq } from '../index/faq/faq-section'
import { Button } from '../../ui/button'

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 text-center p-8 rounded-lg bg-muted/50"
      >
        <h2 className="font-heading text-3xl font-bold mb-4">Enterprise</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Need a custom solution? Our enterprise plan offers tailored features,
          dedicated support, and custom integrations to meet your organization's
          specific needs.
        </p>
        <Button size="lg" variant="default">
          Contact Sales
        </Button>
      </motion.div>

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
