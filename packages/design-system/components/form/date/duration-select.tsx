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
import { useEffect, useState } from 'react'
import { cn } from '@remio/design-system/lib/utils'
import { useFormContext } from '../form-context'

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

  const [value, setValue] = useState(options[0]?.toString())

  useEffect(() => {
    form.setFieldValue(name, value)
  }, [value])

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <RequiredLabel htmlFor={`duration-select-${name}`} required={required}>
        {label}
      </RequiredLabel>
      <Select
        value={value}
        onValueChange={(value) => setValue(value)}
        defaultValue={options[0]?.toString()}
      >
        <SelectTrigger id={`duration-select-${name}`} className="ps-9 relative">
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
    </div>
  )
}
