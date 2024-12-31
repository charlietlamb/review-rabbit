'use client'

import useUser from '@rabbit/design-system/hooks/use-user'
import { updateCurrency } from '@rabbit/design-system/actions/auth/user/update-currency'
import { HttpStatusCodes } from '@rabbit/http'
import { toast } from 'sonner'
import CurrencyPicker from '@rabbit/design-system/components/form/currency/currency-picker'

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
      <CurrencyPicker value={user.currency} onChange={handleChange} />
    </div>
  )
}
