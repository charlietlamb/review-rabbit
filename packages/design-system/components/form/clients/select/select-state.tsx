import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@rabbit/design-system/components/ui/select'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'
import { cn } from '@rabbit/design-system/lib/utils'

export default function SelectState({
  value,
  setValue,
  options,
  className,
  required = false,
  label,
}: {
  value: string | undefined
  setValue: (value: string | undefined) => void
  options: string[]
  className?: string
  required?: boolean
  label: string
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <RequiredLabel required={required}>{label}</RequiredLabel>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue
            className="text-muted-foreground"
            placeholder="Select Csv Column Header"
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
