/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable tailwindcss/no-custom-classname */
'use client'

import { z } from 'zod'
import {
  RadioGroup,
  RadioGroupItem,
} from '@remio/design-system/components/ui/radio-group'
import { cn } from '@remio/design-system/lib/utils'
import { TanstackForm } from '../tanstack-form'
import FieldInfo from '../field-info'
import { useFormContext } from '../form-context'
import RequiredLabel from '@remio/design-system/components/misc/required-label'

const colors = [
  { value: 'blue', label: 'Blue', class: 'bg-blue-500 border-blue-500' },
  {
    value: 'indigo',
    label: 'Indigo',
    class: 'bg-indigo-500 border-indigo-500',
  },
  { value: 'pink', label: 'Pink', class: 'bg-pink-500 border-pink-500' },
  { value: 'red', label: 'Red', class: 'bg-red-500 border-red-500' },
  {
    value: 'orange',
    label: 'Orange',
    class: 'bg-orange-500 border-orange-500',
  },
  { value: 'amber', label: 'Amber', class: 'bg-amber-500 border-amber-500' },
  {
    value: 'emerald',
    label: 'Emerald',
    class: 'bg-emerald-500 border-emerald-500',
  },
] as const

type Color = (typeof colors)[number]['value']

interface ColorPickerProps {
  form: TanstackForm<any>
  name: string
  label: string
  required?: boolean
  className?: string
  innerClassName?: string
}

export default function ColorPicker({
  form,
  name,
  label,
  required,
  className,
  innerClassName,
}: ColorPickerProps) {
  const { attemptSubmitted } = useFormContext()

  return (
    <form.Field
      name={name}
      validators={{
        onChange: z.enum([
          'blue',
          'indigo',
          'pink',
          'red',
          'orange',
          'amber',
          'emerald',
        ] as const),
      }}
    >
      {(field) => (
        <div className={cn('flex flex-col gap-2', className)}>
          <RequiredLabel
            className="text-base"
            htmlFor={field.name}
            required={required}
          >
            {label}
          </RequiredLabel>
          <RadioGroup
            className="flex gap-1.5"
            defaultValue={field.state.value ?? 'blue'}
            onValueChange={(value) => field.handleChange(value as Color)}
          >
            {colors.map((color) => (
              <RadioGroupItem
                key={color.value}
                value={color.value}
                id={`color-${color.value}`}
                aria-label={color.label}
                className={cn(
                  'size-6 shadow-none transition-all duration-200',
                  color.class,
                  innerClassName
                )}
              />
            ))}
          </RadioGroup>
          {attemptSubmitted && <FieldInfo field={field} />}
        </div>
      )}
    </form.Field>
  )
}

export const colorSchema = z.enum([
  'blue',
  'indigo',
  'pink',
  'red',
  'orange',
  'amber',
  'emerald',
])

export type ColorType = z.infer<typeof colorSchema>
