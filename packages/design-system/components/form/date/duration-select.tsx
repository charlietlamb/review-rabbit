import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@remio/design-system/components/ui/select'
import { Clock } from 'lucide-react'
import { TanstackForm } from '../tanstack-form'
import RequiredLabel from '@remio/design-system/components/misc/required-label'
import { cn } from '@remio/design-system/lib/utils'
import { useFormContext } from '../form-context'
import { z } from 'zod'
import FieldInfo from '../field-info'

function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}h ${minutes}m`
}

export default function DurationSelect({
  form,
  name,
  label,
  required,
  interval,
  limit,
  className,
}: {
  form: TanstackForm<any>
  name: string
  label: string
  required: boolean
  interval: number
  limit: number
  className?: string
}) {
  const { attemptSubmitted } = useFormContext()

  const options = Array.from(
    {
      length: Math.floor(limit / interval),
    },
    (_, i) => i * interval + interval
  )

  return (
    <form.Field
      name={name}
      validators={{
        onChange: z
          .number()
          .min(interval, `Duration must be at least ${interval} minutes`),
      }}
    >
      {(field) => (
        <div className={cn('flex flex-col gap-2', className)}>
          <RequiredLabel
            htmlFor={`duration-select-${name}`}
            required={required}
          >
            {label}
          </RequiredLabel>
          <Select
            value={field.state.value?.toString()}
            onValueChange={(value) => field.setValue(Number(value))}
            defaultValue={options[0]?.toString()}
          >
            <SelectTrigger
              id={`duration-select-${name}`}
              className={cn(
                'ps-9 relative',
                attemptSubmitted &&
                  field.state.meta.errors.some((error) => error) &&
                  'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
              )}
            >
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 group-has-[[disabled]]:opacity-50">
                <Clock size={16} strokeWidth={2} aria-hidden="true" />
              </div>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {options.map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {formatMinutes(value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {attemptSubmitted && <FieldInfo field={field} />}
        </div>
      )}
    </form.Field>
  )
}
