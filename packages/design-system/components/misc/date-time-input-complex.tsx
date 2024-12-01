'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

import { cn } from '@dubble/design-system/lib/utils'
import { Button } from '@dubble/design-system/components/ui/button'
import { Calendar } from '@dubble/design-system/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@dubble/design-system/components/ui/popover'
import {
  ScrollArea,
  ScrollBar,
} from '@dubble/design-system/components/ui/scroll-area'
import { toast } from 'sonner'
import { Dispatch, SetStateAction } from 'react'

export function DateTimeInputComplex({
  value,
  setValue,
}: {
  value: Date
  setValue: Dispatch<SetStateAction<Date>>
}) {
  function handleDateSelect(date: Date | undefined) {
    if (!date) return

    const newDate = new Date(date)
    newDate.setHours(value.getHours())
    newDate.setMinutes(value.getMinutes())
    setValue(newDate)
  }

  function handleTimeChange(type: 'hour' | 'minute', newValue: string) {
    const newDate = new Date(value)
    const numValue = parseInt(newValue, 10)

    if (type === 'hour') {
      newDate.setHours(numValue)
    } else {
      newDate.setMinutes(numValue)
    }

    setValue(newDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-full pl-3 text-left font-normal')}
        >
          {value ? (
            format(value, 'MM/dd/yyyy HH:mm')
          ) : (
            <span>MM/DD/YYYY HH:mm</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 24 }, (_, i) => i)
                  .reverse()
                  .map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        value && value.getHours() === hour ? 'default' : 'ghost'
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange('hour', hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      value && value.getMinutes() === minute
                        ? 'default'
                        : 'ghost'
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() =>
                      handleTimeChange('minute', minute.toString())
                    }
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
