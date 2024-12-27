'use client'

import { Button } from '@burse/design-system/components/ui/button'

export default function PricingCta() {
  return (
    <div className="text-center p-8 rounded-lg">
      <h2 className="font-heading font-bold text-3xl mb-4 text-foreground">
        Still have questions?
      </h2>
      <p className="text-muted-foreground mb-6">
        Our team is here to help. Contact us for personalized assistance.
      </p>
      <Button
        variant="shine"
        className="cursor-pointer border-border"
        onClick={() => window.open('mailto:contact@burse.xyz', '_blank')}
      >
        Contact Sales
      </Button>
    </div>
  )
}
