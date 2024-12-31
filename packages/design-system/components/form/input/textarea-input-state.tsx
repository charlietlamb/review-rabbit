import { cn } from '@rabbit/design-system/lib/utils'
import { useFormContext } from '@rabbit/design-system/components/form/form-context'
import { Textarea } from '@rabbit/design-system/components/ui/textarea'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'

export default function TextareaInput({
  value,
  setValue,
  name,
  label,
  placeholder,
  required = false,
  className,
}: {
  value: string
  setValue: (value: string) => void
  name: string
  label: string
  placeholder: string
  required?: boolean
  className?: string
}) {
  const { attemptSubmitted } = useFormContext()
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <RequiredLabel>{label}</RequiredLabel>
      <Textarea
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
