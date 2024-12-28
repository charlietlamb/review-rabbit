import InputWithIconState from '@burse/design-system/components/form/input/input-with-icon-state'
import { Button } from '@burse/design-system/components/ui/button'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { StripeProductWithData } from '@burse/database/schema/stripe-products'
import { FormProvider } from '@burse/design-system/components/form/form-context'
import { toast } from 'sonner'
import { PriceFormSchema } from '@burse/design-system/types/stripe/prices'
import Price from './price'
import useUser from '@burse/design-system/hooks/use-user'
import { v4 as uuidv4 } from 'uuid'
import RequiredLabel from '@burse/design-system/components/misc/required-label'
import { createStripeProduct } from '@burse/design-system/actions/stripe-products/create-stripe-product'
import { useAtomValue } from 'jotai'
import { stripeConnectIdAtom } from '@burse/design-system/atoms/dashboard/stripe/stripe-atoms'
import Spinner from '@burse/design-system/components/misc/spinner'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@burse/design-system/data/query-keys'
import { updateStripeProduct } from '@burse/design-system/actions/stripe-products/update-stripe-product'

export default function ProductForm({
  product,
  onSuccess,
}: {
  product?: StripeProductWithData
  onSuccess?: () => void
}) {
  const user = useUser()
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(product?.title ?? '')
  const queryClient = useQueryClient()
  const [prices, setPrices] = useState<PriceFormSchema[]>(
    product?.prices.map((price) => ({
      id: price.id.toString(),
      title: price.title ?? '',
      price: price.amount ?? 0,
      currency: price.currency ?? '',
    })) ?? []
  )
  const stripeConnectId = useAtomValue(stripeConnectIdAtom)

  function addPrice() {
    setPrices([
      ...prices,
      {
        id: uuidv4(),
        title: 'New Price',
        price: 0,
        currency: user?.currency ?? '',
      },
    ])
  }

  function updatePrices(price: PriceFormSchema) {
    setPrices((currentPrices) => {
      const index = currentPrices.findIndex((p) => p.id === price.id)
      if (index === -1) return currentPrices
      const newPrices = [...currentPrices]
      newPrices[index] = price
      return newPrices
    })
  }

  async function handleSubmit() {
    setAttemptSubmitted(true)
    if (validateForm()) {
      setLoading(true)
      const success = product
        ? await updateStripeProduct(
            {
              title,
              prices,
            },
            product.stripeProductId
          )
        : await createStripeProduct(
            {
              title,
              prices,
            },
            stripeConnectId!
          )
      if (success) {
        toast.success('Product created successfully', {
          description: 'The product has been created in Stripe',
        })
        onSuccess?.()
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.STRIPE_PRODUCTS, stripeConnectId],
        })
      } else {
        toast.error('Failed to create product', {
          description: 'Please try again',
        })
      }
    }
    setLoading(false)
  }

  function validateForm() {
    if (!title) {
      toast.error('Title is required')
      return false
    }
    if (!prices.length) {
      toast.error('At least one price is required')
      return false
    }
    if (!stripeConnectId) {
      toast.error('You are currently not connected to Stripe', {
        description: 'Please connect to Stripe to create a product',
      })
      return false
    }
    return true
  }

  return (
    <FormProvider value={{ attemptSubmitted }}>
      <div className="flex flex-col gap-4">
        <InputWithIconState
          value={title}
          onChange={setTitle}
          icon={<Pencil />}
          placeholder="Title"
          name="title"
          required
          label="Title"
          type="text"
        />
        <RequiredLabel>Prices</RequiredLabel>

        {prices.map((price) => (
          <Price
            key={price.id}
            price={price}
            setPrice={updatePrices}
            onDelete={() => {
              setPrices(prices.filter((p) => p.id !== price.id))
            }}
          />
        ))}

        <Button variant="outline" onClick={addPrice}>
          Add Price
        </Button>

        <Button variant="shine" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner /> : product ? 'Update' : 'Submit'}
        </Button>
      </div>
    </FormProvider>
  )
}
