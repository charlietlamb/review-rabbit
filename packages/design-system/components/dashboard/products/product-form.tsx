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

export default function ProductForm({
  product,
}: {
  product?: StripeProductWithData
}) {
  const user = useUser()
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)
  const [title, setTitle] = useState(product?.title ?? '')
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
      await createStripeProduct(
        {
          title,
          prices,
        },
        stripeConnectId!
      )
    }
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
        <RequiredLabel>Product Prices</RequiredLabel>

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

        <Button variant="shine" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </FormProvider>
  )
}
