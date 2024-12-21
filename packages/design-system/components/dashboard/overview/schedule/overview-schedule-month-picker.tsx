import { Button } from '@remio/design-system/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAtom } from 'jotai'
import { overviewScheduleDateAtom } from '@remio/design-system/atoms/dashboard/overview/overview-atoms'
import { format } from 'date-fns'

export default function OverviewScheduleMonthPicker() {
  const [date, setDate] = useAtom(overviewScheduleDateAtom)
  return (
    <div className="bg-popover/80 flex flex-row justify-between items-center p-2 rounded-lg">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          const newDate = new Date(date)
          newDate.setMonth(date.getMonth() - 1)
          setDate(newDate)
        }}
      >
        <ChevronLeft />
      </Button>
      <span className="font-medium">{format(date, 'MMMM yyyy')}</span>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          const newDate = new Date(date)
          newDate.setMonth(date.getMonth() + 1)
          setDate(newDate)
        }}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
