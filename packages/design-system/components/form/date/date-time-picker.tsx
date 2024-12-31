'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { z } from 'zod'
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
import FieldInfo from '../field-info'
import { useFormContext } from '../form-context'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'
import { TanstackForm } from '../tanstack-form'

interface DateTimePickerProps {
  form: TanstackForm<any>
  name: string
  label: string
  placeholder?: string
  required?: boolean
  className?: string
}

export default function DateTimePicker({
  form,
  name,
  label,
  placeholder = 'MM/DD/YYYY HH:mm',
  required,
  className,
}: DateTimePickerProps) {
  const { attemptSubmitted } = useFormContext()

  return (
    <form.Field
      name={name}
      validators={{
        onChange: z.date(),
      }}
    >
      {(field) => (
        <div className={cn('flex flex-col gap-2', className)}>
          <RequiredLabel htmlFor={field.name} required={required}>
            {label}
          </RequiredLabel>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.state.value && 'text-muted-foreground',
                    attemptSubmitted &&
                      field.state.meta.errors.some((error) => error) &&
                      'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
                  )}
                >
                  {field.state.value ? (
                    format(field.state.value, 'MM/dd/yyyy HH:mm')
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
                    selected={field.state.value}
                    onSelect={(date: Date | undefined) => {
                      if (date) {
                        const newDate = new Date(date)
                        if (field.state.value) {
                          newDate.setHours(field.state.value.getHours())
                          newDate.setMinutes(field.state.value.getMinutes())
                        }
                        field.handleChange(newDate)
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
                                field.state.value &&
                                field.state.value.getHours() === hour
                                  ? 'default'
                                  : 'ghost'
                              }
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() => {
                                const newDate = new Date(
                                  field.state.value || new Date()
                                )
                                newDate.setHours(hour)
                                field.handleChange(newDate)
                              }}
                            >
                              {hour}
                            </Button>
                          ))}
                      </div>
                      <ScrollBar
                        orientation="horizontal"
                        className="sm:hidden"
                      />
                    </ScrollArea>
                    <ScrollArea className="sm:w-auto w-64">
                      <div className="sm:flex-col flex p-2">
                        {Array.from({ length: 12 }, (_, i) => i * 5).map(
                          (minute) => (
                            <Button
                              key={minute}
                              size="icon"
                              variant={
                                field.state.value &&
                                field.state.value.getMinutes() === minute
                                  ? 'default'
                                  : 'ghost'
                              }
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() => {
                                const newDate = new Date(
                                  field.state.value || new Date()
                                )
                                newDate.setMinutes(minute)
                                field.handleChange(newDate)
                              }}
                            >
                              {minute.toString().padStart(2, '0')}
                            </Button>
                          )
                        )}
                      </div>
                      <ScrollBar
                        orientation="horizontal"
                        className="sm:hidden"
                      />
                    </ScrollArea>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {attemptSubmitted && <FieldInfo field={field} />}
        </div>
      )}
    </form.Field>
  )
}
