import { Button } from '@remio/design-system/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addDays, subDays } from 'date-fns'
import { useAtom } from 'jotai'
import { overviewScheduleDateAtom } from '@remio/design-system/atoms/dashboard/overview/overview-atoms'
import { cn } from '@remio/design-system/lib/utils'

export default function DateSlider({
  dateOffset = 2,
}: {
  dateOffset?: number
}) {
  const [selectedDate, setSelectedDate] = useAtom(overviewScheduleDateAtom)

  // Generate array of dates centered on selected date
  const dates = Array.from({ length: 2 * dateOffset + 1 }, (_, i) =>
    addDays(selectedDate, i - dateOffset)
  )

  return (
    <div className="flex items-center justify-between w-full mx-auto px-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={() => setSelectedDate(subDays(selectedDate, 1))}
      >
        <ChevronLeft />
      </Button>

      <div className="flex gap-1 justify-center flex-grow overflow-hidden">
        {dates.map((date) => {
          const isSelected = date.toDateString() === selectedDate.toDateString()

          return (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={cn(
                'flex flex-col items-center min-w-[60px] rounded-lg p-2',
                isSelected && 'bg-primary text-primary-foreground',
                !isSelected && 'hover:bg-muted'
              )}
            >
              <span className="text-xs font-medium">{format(date, 'EEE')}</span>
              <span className="text-xl font-bold">{format(date, 'dd')}</span>
            </button>
          )
        })}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={() => setSelectedDate(addDays(selectedDate, 1))}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
