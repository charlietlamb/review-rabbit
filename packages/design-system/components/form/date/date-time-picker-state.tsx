'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { cn } from '@rabbit/design-system/lib/utils'
import { Button } from '@rabbit/design-system/components/ui/button'
import { Calendar } from '@rabbit/design-system/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@rabbit/design-system/components/ui/popover'
import {
  ScrollArea,
  ScrollBar,
} from '@rabbit/design-system/components/ui/scroll-area'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'

export default function DateTimePickerState({
  value,
  setValue,
  name,
  label,
  placeholder = 'MM/DD/YYYY HH:mm',
  required,
  className,
  hideLabel = false,
}: {
  value: Date
  setValue: (value: Date) => void
  name: string
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  hideLabel?: boolean
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {!hideLabel && (
        <RequiredLabel htmlFor={name} required={required}>
          {label}
        </RequiredLabel>
      )}
      <div className="relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full pl-3 text-left font-normal',
                !value && 'text-muted-foreground'
              )}
            >
              {value ? (
                format(value, 'MM/dd/yyyy HH:mm')
              ) : (
                <span>{placeholder}</span>
              )}
              <CalendarIcon className="size-4 ml-auto opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <div className="sm:flex">
              <Calendar
                mode="single"
                selected={value}
                onSelect={(date: Date | undefined) => {
                  if (date) {
                    const newDate = new Date(date)
                    if (value) {
                      newDate.setHours(value.getHours())
                      newDate.setMinutes(value.getMinutes())
                    }
                    setValue(newDate)
                  }
                }}
                initialFocus
              />
              <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                <ScrollArea className="sm:w-auto w-64">
                  <div className="sm:flex-col flex p-2">
                    {Array.from({ length: 24 }, (_, i) => i)
                      .reverse()
                      .map((hour) => (
                        <Button
                          key={hour}
                          size="icon"
                          variant={
                            value && value.getHours() === hour
                              ? 'default'
                              : 'ghost'
                          }
                          className="sm:w-full shrink-0 aspect-square"
                          onClick={() => {
                            const newDate = new Date(value || new Date())
                            newDate.setHours(hour)
                            setValue(newDate)
                          }}
                        >
                          {hour}
                        </Button>
                      ))}
                  </div>
                  <ScrollBar orientation="horizontal" className="sm:hidden" />
                </ScrollArea>
                <ScrollArea className="sm:w-auto w-64">
                  <div className="sm:flex-col flex p-2">
                    {Array.from({ length: 12 }, (_, i) => i * 5).map(
                      (minute) => (
                        <Button
                          key={minute}
                          size="icon"
                          variant={
                            value && value.getMinutes() === minute
                              ? 'default'
                              : 'ghost'
                          }
                          className="sm:w-full shrink-0 aspect-square"
                          onClick={() => {
                            const newDate = new Date(value || new Date())
                            newDate.setMinutes(minute)
                            setValue(newDate)
                          }}
                        >
                          {minute.toString().padStart(2, '0')}
                        </Button>
                      )
                    )}
                  </div>
                  <ScrollBar orientation="horizontal" className="sm:hidden" />
                </ScrollArea>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
