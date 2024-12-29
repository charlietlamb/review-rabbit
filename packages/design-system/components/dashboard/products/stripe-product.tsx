import { Button } from '@burse/design-system/components/ui/button'
import { ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { StripeProductWithData } from '@burse/database/schema/stripe-products'
import { useQueryClient } from '@tanstack/react-query'
import DangerDialog from '@burse/design-system/components/misc/danger-dialog'
import { QUERY_KEYS } from '@burse/design-system/data/query-keys'
import { useState } from 'react'
import Spinner from '@burse/design-system/components/misc/spinner'
import { deleteStripeProduct } from '@burse/design-system/actions/stripe-products/delete-stripe-product'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@burse/design-system/components/ui/tooltip'
import { useRouter } from 'next/navigation'
export default function StripeProduct({
  stripeProduct,
}: {
  stripeProduct: StripeProductWithData
}) {
  const queryClient = useQueryClient()
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setDeleting(true)
    await deleteStripeProduct(stripeProduct.id)
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.STRIPE_PRODUCTS, stripeProduct.stripeConnectId],
    })
    setDeleting(false)
  }

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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                window.open(
                  `https://dashboard.stripe.com/${stripeProduct.stripeConnectId}/products/${stripeProduct.stripeProductId}`,
                  '_blank'
                )
              }}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View in Stripe</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                router.push(`/dashboard/product/${stripeProduct.id}`)
              }}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit Product</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <DangerDialog
                title="Delete Stripe Product"
                description="Are you sure you want to delete this Stripe product? This action cannot be undone."
                onClick={handleDelete}
              >
                <Button variant="destructive" disabled={deleting} size="icon">
                  {deleting ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </DangerDialog>
            </div>
          </TooltipTrigger>
          <TooltipContent>Delete Product</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
