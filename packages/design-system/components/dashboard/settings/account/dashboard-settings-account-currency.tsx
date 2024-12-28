'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@burse/design-system/components/ui/select'
import { currenciesWithFlags } from '@burse/design-system/data/currency'
import useUser from '@burse/design-system/hooks/use-user'
import { updateCurrency } from '@burse/design-system/actions/auth/user/update-currency'
import { HttpStatusCodes } from '@burse/http'
import { toast } from 'sonner'

export default function DashboardSettingsAccountCurrency() {
  const user = useUser()

  async function handleChange(value: string) {
    const status = await updateCurrency(value)
    if (status === HttpStatusCodes.OK) {
      toast.success('Currency updated', {
        description: 'This will now be the default currency for your account.',
      })
    } else {
      toast.error('Failed to update currency', {
        description: 'Please try again.',
      })
    }
  }

  if (!user) return null
  return (
    <div className="p-4 flex flex-col gap-2">
      <div>
        <p className="font-heading font-bold">Default currency</p>
        <p className="text-sm text-muted-foreground">
          We will use this currency to price all of your products and services.
        </p>
      </div>
      <Select defaultValue={user.currency} onValueChange={handleChange}>
        <SelectTrigger
          id="select-37"
          className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80"
        >
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
    </div>
  )
}
