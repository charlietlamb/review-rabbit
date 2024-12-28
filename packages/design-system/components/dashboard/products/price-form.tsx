import { PriceFormSchema } from '@burse/design-system/types/stripe/prices'
import InputWithIconState from '@burse/design-system/components/form/input/input-with-icon-state'
import { Pencil } from 'lucide-react'
import CurrencyPicker from '@burse/design-system/components/form/currency/currency-picker'
import RequiredLabel from '@burse/design-system/components/misc/required-label'
import MoneyInputState from '@burse/design-system/components/form/money/money-input-state'
import { Currency } from '@burse/design-system/data/currency'

export default function PriceForm({
  price,
  setPrice,
}: {
  price: PriceFormSchema
  setPrice: (price: PriceFormSchema) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <InputWithIconState
        icon={<Pencil />}
        value={price.title}
        onChange={(value) => setPrice({ ...price, title: value })}
        name="title"
        label="Title"
        placeholder="Title"
        type="text"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <MoneyInputState
          value={price.price}
          setValue={(value) => setPrice({ ...price, price: value })}
          name="price"
          label="Price"
          required
          currency={price.currency.toUpperCase() as Currency}
          className="flex flex-col gap-2"
          inputClassName="h-full"
        />
        <div className="flex flex-col gap-2">
          <RequiredLabel className="text-base">Currency</RequiredLabel>
          <CurrencyPicker
            value={price.currency}
            onChange={(value) => setPrice({ ...price, currency: value })}
          />
        </div>
      </div>
    </div>
  )
}
