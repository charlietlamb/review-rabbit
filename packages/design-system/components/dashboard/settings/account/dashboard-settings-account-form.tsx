'use client'

import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { Button } from '@remio/design-system/components/ui/button'
import ImageForm from '@remio/design-system/components/auth/form/image'
import useUser from '@remio/design-system/hooks/use-user'
import { useRouter } from 'next/navigation'
import DashboardSettingsAccountEmailVerification from './dashboard-settings-account-email-verification'
import Name from '@remio/design-system/components/auth/form/name'
import Email from '@remio/design-system/components/auth/form/email'
import Spinner from '@remio/design-system/components/misc/spinner'
import { toast } from 'sonner'
import UpdatePassword from '@remio/design-system/components/auth/update-password/update-password'
import { useState } from 'react'
import { MAX_FILE_SIZE_STRING } from '@remio/design-system/data/max-image-size'
import { updateUser } from '@remio/design-system/actions/auth/user/update-user'
import { uploadProfilePictureClient } from '@remio/design-system/actions/s3/upload/upload-profile-picture-client'
import { User } from '@remio/database/schema/users'

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
        const res = await uploadProfilePictureClient(user as User, file as File)
        if (res !== 200) {
          console.error('Failed to upload profile picture')
        }
      }
      if (user) {
        await updateUser({
          name: values.formApi.getFieldValue('name') as string,
          email: values.formApi.getFieldValue('email') as string,
        })
        toast.success('Account updated', {
          description: 'Your account has been updated successfully',
        })
        router.refresh()
      }
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: userFormSchema,
    },
  })
  const [fileTooLarge, setFileTooLarge] = useState(false)

  if (!user) return null
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="p-4"
    >
      <div>
        <Name form={form} />
        <Email form={form} />
        <DashboardSettingsAccountEmailVerification />
        <div className="md:grid-cols-2 grid grid-cols-1 gap-2">
          <ImageForm
            form={form}
            previewUrl={user.image ?? undefined}
            setFileTooLarge={setFileTooLarge}
          />
          <UpdatePassword />
        </div>
        <Button
          type="submit"
          disabled={form.state.isSubmitting || fileTooLarge}
          className="w-full mt-2"
        >
          {fileTooLarge ? (
            `File too large, max size is ${MAX_FILE_SIZE_STRING}`
          ) : form.state.isSubmitting ? (
            <Spinner />
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  )
}
