'use client'

import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import FieldInfo from '@/components/form/field-info'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Mail, User } from 'lucide-react'
import ImageUpload from '@/components/form/image-upload'
import { Button } from '@/components/ui/button'
import { uploadProfilePicture } from '@/actions/s3/upload/upload-profile-picture'
import { updateUser } from '@/actions/auth/user/update-user'
import useUser from '@/hooks/use-user'
import useJwtClient from '@/hooks/use-jwt-client'
import { useRouter } from 'next/navigation'

const userFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  image: zfd
    .file()
    .optional()
    .refine(
      (file) => !file || file?.size <= 1024 * 1024 * 3,
      'Max size is 3MB'
    ),
})

type UserFormSchema = z.infer<typeof userFormSchema>

export default function DashboadSettingsAccountForm() {
  const user = useUser()
  const jwt = useJwtClient()
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      image: undefined,
    } as UserFormSchema,
    onSubmit: async (values) => {
      const file = values.formApi.getFieldValue('image')
      if (file) {
        const res = await uploadProfilePicture({
          file,
          jwt,
        })
      }
      if (user) {
        await updateUser(
          {
            id: user.id,
            name: values.formApi.getFieldValue('name'),
            email: values.formApi.getFieldValue('email'),
          },
          jwt
        )
        router.refresh()
      }
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: userFormSchema,
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div>
        <form.Field
          name="name"
          validators={{ onChange: z.string().min(1) }}
          children={(field) => (
            <div className="flex flex-col gap-1">
              <Label
                htmlFor={field.name}
                className="font-heading text-base font-semibold"
              >
                Name
              </Label>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Name"
                  type="text"
                  className={cn(
                    '',
                    field.state.meta.errors.some((error) => error) &&
                      'peer pe-9 border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
                  )}
                />
                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <User
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className={cn(
                      field.state.meta.errors.some((error) => error) &&
                        'text-destructive/80'
                    )}
                  />
                </div>
              </div>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="email"
          validators={{ onChange: z.string().email() }}
          children={(field) => (
            <div className="flex flex-col gap-1">
              <Label
                htmlFor={field.name}
                className="font-heading text-base font-semibold"
              >
                Email
              </Label>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Email"
                  type="email"
                  className={cn(
                    '',
                    field.state.meta.errors.some((error) => error) &&
                      'peer pe-9 border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
                  )}
                />
                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Mail
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className={cn(
                      field.state.meta.errors.some((error) => error) &&
                        'text-destructive/80'
                    )}
                  />
                </div>
              </div>
              <FieldInfo field={field} />
            </div>
          )}
        />
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
          children={(field) => (
            <div className="flex flex-col gap-1">
              <Label
                htmlFor={field.name}
                className="font-heading text-base font-semibold"
              >
                Profile picture
              </Label>
              <ImageUpload previewUrl={user.image ?? undefined} field={field} />
              <FieldInfo field={field} />
            </div>
          )}
        />
        <Button type="submit">Save</Button>
        {form.state.isSubmitting && <p>Saving...</p>}
        {form.state.isSubmitted && <p>Saved</p>}
      </div>
    </form>
  )
}
