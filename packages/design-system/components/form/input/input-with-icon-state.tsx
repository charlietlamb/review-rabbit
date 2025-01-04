import { Input } from '@rabbit/design-system/components/ui/input'
import { cn } from '@rabbit/design-system/lib/utils'
import { cloneElement } from 'react'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'
import { useFormContext } from '../form-context'
import InputError from './input-error'

export default function InputWithIconState({
  value,
  onChange,
  name,
  label,
  placeholder,
  icon,
  type,
  required,
  className,
  hideLabel = false,
}: {
  value: string
  onChange: (value: string) => void
  name: string
  label: string
  placeholder: string
  icon: React.ReactElement
  type: 'text' | 'email' | 'password'
  required: boolean
  className?: string
  hideLabel?: boolean
}) {
  const { attemptSubmitted } = useFormContext()
  const isError = attemptSubmitted && required && !value

  function iconWithProps() {
    return cloneElement(icon, {
      size: 16,
      strokeWidth: 2,
      'aria-hidden': true,
      className: cn(isError && 'text-destructive/80'),
    })
  }

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {!hideLabel && (
        <RequiredLabel
          htmlFor={name}
          className="font-heading text-foreground text-base font-semibold"
          required={required}
        >
          {label}
        </RequiredLabel>
      )}
      <div className="relative">
        <Input
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={type}
          className={cn(
            'peer pe-9',
            isError &&
              ' border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
          )}
        />
        <div className="end-0 pe-3 text-muted-foreground/80 peer-disabled:opacity-50 absolute inset-y-0 flex items-center justify-center pointer-events-none">
          {iconWithProps()}
        </div>
      </div>
      <InputError isError={isError} error="This field is required" />
    </div>
  )
}
