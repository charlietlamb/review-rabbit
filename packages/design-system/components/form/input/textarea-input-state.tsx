import { cn } from '@rabbit/design-system/lib/utils'
import { useFormContext } from '@rabbit/design-system/components/form/form-context'
import { Textarea } from '@rabbit/design-system/components/ui/textarea'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'

export default function TextareaInputState({
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
    <div className={cn('flex flex-col gap-2', className)}>
      <RequiredLabel>{label}</RequiredLabel>
      <Textarea
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      {attemptSubmitted && !value && (
        <p className="text-sm text-red-500">This field is required</p>
      )}
    </div>
  )
}
