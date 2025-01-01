'use client'

import { Input } from '@rabbit/design-system/components/ui/input'
import { cn } from '@rabbit/design-system/lib/utils'
import { ChevronDown, Phone } from 'lucide-react'
import React, { forwardRef } from 'react'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import { useFormContext } from '../form-context'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'

export default function PhoneNumberInputState({
  name,
  label,
  placeholder = 'Enter phone number',
  required,
  className,
  value,
  onChange,
}: {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  value: string
  onChange: (value: string) => void
}) {
  const { attemptSubmitted } = useFormContext()

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <RequiredLabel
        htmlFor={name}
        className="font-heading text-foreground text-base font-semibold"
        required={required}
      >
        {label}
      </RequiredLabel>
      <div className="relative">
        <RPNInput.default
          className="shadow-black/5 flex rounded-lg shadow-sm"
          international
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={PhoneInput}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(value) => onChange(value ?? '')}
        />
      </div>
    </div>
  )
}

const PhoneInput = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        className={cn(
          '-ms-px rounded-s-none shadow-none focus-visible:z-10',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

PhoneInput.displayName = 'PhoneInput'

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  onChange: (value: RPNInput.Country) => void
  options: { label: string; value: RPNInput.Country | undefined }[]
}

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as RPNInput.Country)
  }

  return (
    <div className="relative inline-flex items-center self-stretch rounded-s-lg border border-input bg-background py-2 pe-2 ps-3 text-muted-foreground transition-shadow focus-within:z-10 focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 hover:bg-accent hover:text-foreground has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50">
      <div className="inline-flex items-center gap-1" aria-hidden="true">
        <FlagComponent country={value} countryName={value} aria-hidden="true" />
        <span className="text-muted-foreground/80">
          <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
      <select
        disabled={disabled}
        value={value}
        onChange={handleSelect}
        className="absolute inset-0 text-sm opacity-0"
        aria-label="Select country"
      >
        <option key="default" value="">
          Select a country
        </option>
        {options
          .filter((x) => x.value)
          .map((option, i) => (
            <option key={option.value ?? `empty-${i}`} value={option.value}>
              {option.label}{' '}
              {option.value &&
                `+${RPNInput.getCountryCallingCode(option.value)}`}
            </option>
          ))}
      </select>
    </div>
  )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className="w-5 overflow-hidden rounded-sm">
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <Phone size={16} aria-hidden="true" />
      )}
    </span>
  )
}
