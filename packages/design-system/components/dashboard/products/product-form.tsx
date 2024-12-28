import InputWithIconState from '@burse/design-system/components/form/input/input-with-icon-state'
import { Button } from '@burse/design-system/components/ui/button'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { StripeProductWithData } from '@burse/database/schema/stripe-products'
import { FormProvider } from '@burse/design-system/components/form/form-context'
import { toast } from 'sonner'

export default function ProductForm({
  product,
}: {
  product?: StripeProductWithData
}) {
  //add products to form + work out currency
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)
  const [title, setTitle] = useState(product?.title ?? '')
  const [products, setProducts] = useState<StripeProductWithData[]>([])

  function handleSubmit() {
    setAttemptSubmitted(true)
    if (validateForm()) {
      console.log('Form is valid')
    }
  }

  function validateForm() {
    if (!title) {
      toast.error('Title is required')
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

        <Button variant="shine" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </FormProvider>
  )
}
