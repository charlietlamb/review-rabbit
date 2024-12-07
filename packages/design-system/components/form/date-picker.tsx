'use client'

import * as React from 'react'
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
import { TanstackForm } from './tanstack-form'
import { Label } from '@remio/design-system/components/ui/label'
import FieldInfo from './field-info'
import { useFormContext } from './form-context'

export default function DatePicker({
  form,
  name,
  label,
  placeholder,
  required,
  className,
}: {
  form: TanstackForm<any>
  name: string
  label: string
  placeholder: string
  required?: boolean
  className?: string
}) {
  const { attemptSubmitted } = useFormContext()
  return (
    <form.Field name={name} validators={{ onChange: z.date() }}>
      {(field) => (
        <div className={cn('flex flex-col gap-1', className)}>
          <Label
            htmlFor={field.name}
            className="font-heading text-base font-semibold text-foreground"
          >
            {label} {required && <span className="text-destructive">*</span>}
          </Label>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={field.name}
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.state.value && 'text-muted-foreground',
                    attemptSubmitted &&
                      field.state.meta.errors.some((error) => error) &&
                      'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
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
                  onSelect={(date) => field.handleChange(date)}
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
