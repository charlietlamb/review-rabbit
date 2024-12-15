'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { z } from 'zod'
import { cn } from '@remio/design-system/lib/utils'
import { Button } from '@remio/design-system/components/ui/button'
import { Calendar } from '@remio/design-system/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@remio/design-system/components/ui/popover'
import { TanstackForm } from '../tanstack-form'
import FieldInfo from '../field-info'
import { useFormContext } from '../form-context'
import RequiredLabel from '@remio/design-system/components/misc/required-label'

export default function DatePicker({
  form,
  name,
  label,
  placeholder = 'Select a date',
  required,
  className,
}: {
  form: TanstackForm<any>
  name: string
  label: string
  placeholder?: string
  required?: boolean
  className?: string
}) {
  const { attemptSubmitted } = useFormContext()
  return (
    <form.Field name={name} validators={{ onChange: z.date() }}>
      {(field) => (
        <div className={cn('flex flex-col gap-2', className)}>
          <RequiredLabel htmlFor={field.name} required={required}>
            {label}
          </RequiredLabel>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={field.name}
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.state.value && 'text-muted-foreground',
                    attemptSubmitted &&
                      field.state.meta.errors.some((error) => error) &&
                      'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
                  )}
                >
                  <CalendarIcon className="size-4 mr-2" />
                  {field.state.value ? (
                    format(field.state.value, 'PPP')
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.state.value}
                  onSelect={(date) => date && field.setValue(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {attemptSubmitted && <FieldInfo field={field} />}
        </div>
      )}
    </form.Field>
  )
}
