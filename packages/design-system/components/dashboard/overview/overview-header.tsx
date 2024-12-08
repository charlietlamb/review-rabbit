'use client'

import { DateRangePicker } from '@remio/design-system/components/misc/date-range-picker'
import useUser from '@remio/design-system/hooks/use-user'

export default function OverviewHeader() {
  const user = useUser()
  return (
    <div className="flex items-center justify-between gap-2 p-4">
      <h2 className="text-2xl font-bold tracking-tight">
        Hi {user?.name.split(' ')[0]}, welcome back 👋
      </h2>
      <DateRangePicker />
    </div>
  )
}
