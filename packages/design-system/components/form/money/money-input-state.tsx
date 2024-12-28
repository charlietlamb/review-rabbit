'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button, Group, Input, NumberField } from 'react-aria-components'
import { cn } from '@burse/design-system/lib/utils'
import { useFormContext } from '../form-context'
import RequiredLabel from '@burse/design-system/components/misc/required-label'
import { Currency } from '@burse/design-system/data/currency'

export default function MoneyInputState({
  value,
  setValue,
  name,
  label,
  placeholder = 'Enter amount',
  required,
  className,
  inputClassName,
  currency = 'usd',
}: {
  value: number
  setValue: (value: number) => void
  name: string
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  inputClassName?: string
  currency?: Currency
}) {
  const { attemptSubmitted } = useFormContext()

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <RequiredLabel
        htmlFor={name}
        className="font-heading text-foreground text-base font-semibold"
      >
        {label}
      </RequiredLabel>
      <NumberField
        value={value}
        onChange={(value) => setValue(value)}
        formatOptions={{
          style: 'currency',
          currency: currency,
          currencySign: 'standard',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }}
        minValue={0}
        isRequired={required}
        aria-label={label}
        className={inputClassName}
      >
        <div className="relative h-full">
          <Group
            className={cn(
              'relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20 h-full'
            )}
          >
            <Input
              name={name}
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
    </div>
  )
}
