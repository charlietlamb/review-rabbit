import { pricingTiers } from './pricing-data'
import { PricingCard } from './pricing-card'
import PricingCta from './pricing-cta'
import { Faq } from '../index/faq/faq-section'

export function Pricing() {
  return (
    <div className="container flex flex-col px-4 py-16 mx-auto">
      <span className="text-primary font-bold text-center uppercase">
        Pricing
      </span>
      <h1 className="font-heading mb-2 text-4xl font-bold text-center">
        Choose Your Plan
      </h1>
      <p className="text-muted-foreground mb-8 text-center">
        Choose the plan that best suits your needs.
      </p>
      <div className="md:grid-cols-3 grid grid-cols-1 gap-8">
        {pricingTiers.map((tier, index) => (
          <PricingCard key={index} tier={tier} />
        ))}
      </div>
      <Faq />
      <PricingCta />
    </div>
  )
}
