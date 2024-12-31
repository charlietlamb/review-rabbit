'use client'

import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { Button } from '@rabbit/design-system/components/ui/button'
import ImageForm from '@rabbit/design-system/components/auth/form/image'
import useUser from '@rabbit/design-system/hooks/use-user'
import { useRouter } from 'next/navigation'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { toast } from 'sonner'
import { useState } from 'react'
import { MAX_FILE_SIZE_STRING } from '@rabbit/design-system/data/max-image-size'
import { updateUser } from '@rabbit/design-system/actions/auth/user/update-user'
import { uploadProfilePictureClient } from '@rabbit/design-system/actions/s3/upload/upload-profile-picture-client'
import { User } from '@rabbit/database/schema/users'
import InputWithIcon from '@rabbit/design-system/components/form/input/input-with-icon'
import { Mail, User as UserIcon } from 'lucide-react'
import { FormContext } from '@rabbit/design-system/components/form/form-context'

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
  const [attemptSubmitted, setAttemptSubmitted] = useState<boolean>(false)

  if (!user) return null
  return (
    <FormContext.Provider value={{ attemptSubmitted }}>
      <form
        onSubmit={(e) => {
          setAttemptSubmitted(true)
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="p-4"
      >
        <div className="grid grid-cols-1 gap-4">
          <InputWithIcon
            form={form}
            name="name"
            icon={<UserIcon />}
            label="Name"
            placeholder="Name"
            type="text"
            required
          />
          <InputWithIcon
            form={form}
            name="email"
            icon={<Mail />}
            label="Email"
            placeholder="Email"
            type="text"
            required
          />
          <ImageForm
            form={form}
            previewUrl={user.image ?? undefined}
            setFileTooLarge={setFileTooLarge}
          />
          <Button
            type="submit"
            disabled={form.state.isSubmitting || fileTooLarge}
            className="w-full mt-2 font-heading font-bold"
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
    </FormContext.Provider>
  )
}
