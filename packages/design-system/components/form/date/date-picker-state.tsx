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
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'

export default function DatePicker({
  value,
  setValue,
  name,
  label,
  placeholder = 'Select a date',
  required,
  className,
}: {
  value: Date
  setValue: (value: Date) => void
  name: string
  label: string
  placeholder?: string
  required?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <RequiredLabel htmlFor={name} required={required}>
        {label}
      </RequiredLabel>
      <div className="relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn('w-full justify-start text-left font-normal')}
            >
              <CalendarIcon className="size-4 mr-2" />
              {value ? format(value, 'PPP') : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={(date) => date && setValue(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
