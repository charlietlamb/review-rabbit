import { z } from 'zod'
import { Input } from '@remio/design-system/components/ui/input'
import { cn } from '@remio/design-system/lib/utils'
import FieldInfo from '@remio/design-system/components/form/field-info'
import { TanstackForm } from '@remio/design-system/components/form/tanstack-form'
import { FieldApi } from '@tanstack/react-form'
import { cloneElement } from 'react'
import { useFormContext } from './form-context'
import RequiredLabel from '@remio/design-system/components/misc/required-label'

export default function InputWithIcon({
  form,
  name,
  label,
  placeholder,
  icon,
  type,
  required,
  className,
}: {
  form: TanstackForm<any>
  name: string
  label: string
  placeholder: string
  icon: React.ReactElement
  type: 'text' | 'email' | 'password'
  required: boolean
  className?: string
}) {
  const { attemptSubmitted } = useFormContext()
  function iconWithProps(field: FieldApi<any, any>) {
    return cloneElement(icon, {
      size: 16,
      strokeWidth: 2,
      'aria-hidden': true,
      className: cn(
        attemptSubmitted &&
          field.state.meta.errors.some((error) => error) &&
          'text-destructive/80'
      ),
    })
  }
  return (
    <form.Field name={name} validators={{ onChange: z.string().min(1) }}>
      {(field) => (
        <div className={cn('flex flex-col gap-1', className)}>
          <RequiredLabel
            htmlFor={field.name}
            className="font-heading text-foreground text-base font-semibold"
            required={required}
          >
            {label}
          </RequiredLabel>
          <div className="relative">
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value ?? ''}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder={placeholder}
              type={type}
              className={cn(
                attemptSubmitted &&
                  field.state.meta.errors.some((error) => error) &&
                  'peer pe-9 border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
              )}
            />
            <div className="end-0 pe-3 text-muted-foreground/80 peer-disabled:opacity-50 absolute inset-y-0 flex items-center justify-center pointer-events-none">
              {iconWithProps(field as unknown as FieldApi<any, any>)}
            </div>
          </div>
          {attemptSubmitted && <FieldInfo field={field} />}
        </div>
      )}
    </form.Field>
  )
}
