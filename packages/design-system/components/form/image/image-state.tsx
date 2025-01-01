import ImageUploadState from '@rabbit/design-system/components/form/image/image-upload-state'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'

export default function Image({
  value,
  onChange,
  name,
  previewUrl,
  label,
  required,
}: {
  value?: File | string | null
  onChange: (value: File | null) => void
  name: string
  previewUrl?: string
  label: string
  required: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <RequiredLabel htmlFor={name} required={required}>
        {label}
      </RequiredLabel>
      <ImageUploadState
        value={value}
        onChange={onChange}
        name={name}
        previewUrl={previewUrl}
      />
    </div>
  )
}
