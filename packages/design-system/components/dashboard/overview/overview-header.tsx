'use client'

import { DateRangePicker } from '@remio/design-system/components/misc/date-range-picker'
import useUser from '@remio/design-system/hooks/use-user'
import { useAtom } from 'jotai'
import { format } from 'date-fns'
import { overviewDateRange } from '@remio/design-system/atoms/dashboard/overview/overview-atoms'

export default function OverviewHeader() {
  const user = useUser()
  const [dateRange, setDateRange] = useAtom(overviewDateRange)
  return (
    <div className="flex items-center justify-between gap-2 p-4">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight">
          Hi {user?.name.split(' ')[0]}, welcome back 👋
        </h2>
        <p className="text-sm text-muted-foreground">
          Displaying data for{' '}
          {format(dateRange?.from ?? new Date(), 'dd MMM yyyy')} to{' '}
          {format(dateRange?.to ?? new Date(), 'dd MMM yyyy')}
        </p>
      </div>

      <DateRangePicker date={dateRange} setDate={setDateRange} />
    </div>
  )
}
