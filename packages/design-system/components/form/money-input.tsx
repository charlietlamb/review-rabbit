'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button, Group, Input, Label, NumberField } from 'react-aria-components'
import { cn } from '@remio/design-system/lib/utils'
import { TanstackForm } from './tanstack-form'
import { z } from 'zod'
import FieldInfo from './field-info'
import { useFormContext } from './form-context'
import RequiredLabel from '@remio/design-system/components/misc/required-label'

interface MoneyInputProps {
  form: TanstackForm<any>
  name: string
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  currency?: string
}

export default function MoneyInput({
  form,
  name,
  label,
  placeholder = 'Enter amount',
  required,
  className,
  currency = 'EUR',
}: MoneyInputProps) {
  const { attemptSubmitted } = useFormContext()

  return (
    <form.Field
      name={name}
      validators={{
        onChange: z.number().min(0, 'Amount must be positive'),
      }}
    >
      {(field) => (
        <div className={cn('flex flex-col gap-1', className)}>
          <RequiredLabel
            htmlFor={field.name}
            className="font-heading text-foreground text-base font-semibold"
          >
            {label}
          </RequiredLabel>
          <NumberField
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            onBlur={field.handleBlur}
            formatOptions={{
              style: 'currency',
              currency: currency,
              currencySign: 'accounting',
            }}
            minValue={0}
            isRequired={required}
            aria-label={label}
          >
            <div className="relative">
              <Group
                className={cn(
                  'relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20',
                  attemptSubmitted &&
                    field.state.meta.errors.some((error) => error) &&
                    'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
                )}
              >
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder={placeholder}
                  className="bg-background tabular-nums text-foreground focus:outline-none flex-1 px-3 py-2"
                />
                <div className="flex h-[calc(100%+2px)] flex-col">
                  <Button
                    slot="increment"
                    className="-me-px h-1/2 border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center flex-1 w-6 text-sm transition-shadow border"
                  >
                    <ChevronUp size={12} strokeWidth={2} aria-hidden="true" />
                  </Button>
                  <Button
                    slot="decrement"
                    className="-me-px h-1/2 border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center flex-1 w-6 -mt-px text-sm transition-shadow border"
                  >
                    <ChevronDown size={12} strokeWidth={2} aria-hidden="true" />
                  </Button>
                </div>
              </Group>
            </div>
          </NumberField>
          {attemptSubmitted && <FieldInfo field={field} />}
        </div>
      )}
    </form.Field>
  )
}
