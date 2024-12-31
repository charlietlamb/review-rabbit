import { cn } from '@rabbit/design-system/lib/utils'
import { FieldApi } from '@tanstack/react-form'

export default function FieldInfo({
  field,
}: {
  field: FieldApi<any, any, any, any>
}) {
  if (!field.state.meta.errors.length) return null
  return (
    <span
      className={cn(
        'text-sm text-muted-foreground',
        field.state.meta.isTouched &&
          field.state.meta.errors.length &&
          'text-destructive'
      )}
    >
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </span>
  )
}
