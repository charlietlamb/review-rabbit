'use client'

import RequiredLabel from '@rabbit/design-system/components/misc/required-label'
import {
  TimeField,
  TimeValue,
  DateInput,
  DateSegment,
  Group,
  NumberField,
  Input,
} from 'react-aria-components'
import { cn } from '@rabbit/design-system/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@rabbit/design-system/components/ui/button'
import { useFormContext } from '../form-context'

interface ExtendedTimeValue {
  time: TimeValue | null
  days: number
}

interface TimeInputStateProps {
  value: ExtendedTimeValue | null
  onChange: (value: ExtendedTimeValue | null) => void
  name: string
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  inputClassName?: string
}

export default function TimeInputState({
  value,
  onChange,
  name,
  label,
  placeholder = 'Enter days',
  required = true,
  className,
  inputClassName,
}: TimeInputStateProps) {
  const { attemptSubmitted } = useFormContext()

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-col gap-1">
        <RequiredLabel
          required={required}
          htmlFor={name}
          className="font-heading text-foreground text-base font-semibold"
        >
          Days
        </RequiredLabel>
        <NumberField
          value={value?.days ?? 0}
          onChange={(newDays) =>
            onChange(
              value
                ? { ...value, days: newDays }
                : { time: null, days: newDays }
            )
          }
          formatOptions={{
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
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
            </Group>
          </div>
        </NumberField>
      </div>

      <div className="flex flex-col gap-1">
        <TimeField
          value={value?.time}
          onChange={(newTimeValue) => {
            onChange(
              value
                ? { ...value, time: newTimeValue }
                : { time: newTimeValue, days: 0 }
            )
          }}
        >
          <RequiredLabel
            required={required}
            htmlFor={name}
            className="font-heading text-foreground text-base font-semibold"
          >
            {label}
          </RequiredLabel>
          <DateInput className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
            {(segment) => (
              <DateSegment
                segment={segment}
                className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
              />
            )}
          </DateInput>
        </TimeField>
      </div>
    </div>
  )
}
