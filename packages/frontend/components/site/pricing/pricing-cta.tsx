import { Button } from '@/components/ui/button'

export default function PricingCta() {
  return (
    <div className="text-center p-8 rounded-lg">
      <h2 className="font-heading font-bold text-3xl mb-4">
        Still have questions?
      </h2>
      <p className="text-muted-foreground mb-6">
        Our team is here to help. Contact us for personalized assistance.
      </p>
      <Button size="lg">Contact Sales</Button>
    </div>
  )
}
