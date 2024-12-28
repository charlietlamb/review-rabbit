import { Button } from '@burse/design-system/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { StripeProductWithData } from '@burse/database/schema/stripe-products'

export default function StripeConnect({
  stripeProduct,
}: {
  stripeProduct: StripeProductWithData
}) {
  return (
    <div className="flex w-full items-center justify-between p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium text-muted-foreground">
          {stripeProduct.stripeProductId}
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm">{stripeProduct.title}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            window.open(
              `https://dashboard.stripe.com/${stripeProduct.stripeProductId}`,
              '_blank'
            )
          }}
          className="flex items-center gap-2"
        >
          Dashboard
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
