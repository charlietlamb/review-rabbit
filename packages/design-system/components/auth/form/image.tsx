import ImageUpload from '@rabbit/design-system/components/form/image/image-upload'
import { Label } from '@rabbit/design-system/components/ui/label'
import FieldInfo from '@rabbit/design-system/components/form/field-info'
import { zfd } from 'zod-form-data'
import { SetStateAction } from 'react'
import { Dispatch } from 'react'
import { TanstackForm } from '@rabbit/design-system/components/form/tanstack-form'

export default function Image({
  form,
  previewUrl,
  setFileTooLarge,
}: {
  form: TanstackForm<any>
  previewUrl?: string
  setFileTooLarge: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <form.Field
      name="image"
      validators={{
        onChange: zfd
          .file()
          .optional()
          .refine(
            (file) => !file || file?.size <= 1024 * 1024 * 3,
            'Max size is 3MB'
          ),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1">
          <Label
            htmlFor={field.name}
            className="font-heading text-base font-semibold"
          >
            Profile picture
          </Label>
          <ImageUpload
            previewUrl={previewUrl}
            field={field}
            setFileTooLarge={setFileTooLarge}
          />
          <FieldInfo field={field} />
        </div>
      )}
    </form.Field>
  )
}
