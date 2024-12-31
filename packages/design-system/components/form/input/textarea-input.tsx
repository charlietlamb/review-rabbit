import { z } from 'zod'
import { cn } from '@rabbit/design-system/lib/utils'
import FieldInfo from '@rabbit/design-system/components/form/field-info'
import { TanstackForm } from '@rabbit/design-system/components/form/tanstack-form'
import { useFormContext } from '@rabbit/design-system/components/form/form-context'
import { Textarea } from '@rabbit/design-system/components/ui/textarea'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'

export default function TextareaInput({
  form,
  name,
  label,
  placeholder,
  required = false,
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
    <form.Field
      name={name}
      validators={{ onChange: required ? z.string().min(1) : undefined }}
    >
      {(field) => (
        <div className={cn('flex flex-col gap-1', className)}>
          <RequiredLabel>{label}</RequiredLabel>
          <Textarea
            id={field.name}
            name={field.name}
            value={field.state.value ?? ''}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder={placeholder}
            className={cn(
              attemptSubmitted &&
                field.state.meta.errors.some((error) => error) &&
                'peer pe-9 border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
            )}
          />
          {attemptSubmitted && <FieldInfo field={field} />}
        </div>
      )}
    </form.Field>
  )
}
