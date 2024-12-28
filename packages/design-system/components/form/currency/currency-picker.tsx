import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@burse/design-system/components/ui/select'
import { currenciesWithFlags } from '@burse/design-system/data/currency'

export default function CurrencyPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Select defaultValue={value} onValueChange={onChange}>
      <SelectTrigger className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
        {currenciesWithFlags.map((currency) => (
          <SelectItem key={currency.value} value={currency.value}>
            <span className="text-lg leading-none">{currency.flag}</span>{' '}
            <span className="truncate">{currency.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
