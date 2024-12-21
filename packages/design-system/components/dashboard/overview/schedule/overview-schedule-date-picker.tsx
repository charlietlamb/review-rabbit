import { Button } from '@remio/design-system/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addDays, subDays } from 'date-fns'
import { useAtom } from 'jotai'
import { overviewScheduleDateAtom } from '@remio/design-system/atoms/dashboard/overview/overview-atoms'
import { cn } from '@remio/design-system/lib/utils'

export default function DateSlider() {
  const [selectedDate, setSelectedDate] = useAtom(overviewScheduleDateAtom)

  // Generate array of 5 dates centered on selected date
  const dates = [-2, -1, 0, 1, 2].map((offset) => addDays(selectedDate, offset))

  return (
    <div className="flex items-center justify-between w-full mx-auto">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setSelectedDate(subDays(selectedDate, 1))}
      >
        <ChevronLeft />
      </Button>

      <div className="flex gap-1">
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
        className="h-8 w-8"
        onClick={() => setSelectedDate(addDays(selectedDate, 1))}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
