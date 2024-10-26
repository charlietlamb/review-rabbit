'use client'

import useUser from '@/hooks/use-user'
import { useForm } from '@tanstack/react-form'
import { selectUserSchema } from '@/backend/src/db/schema/users'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'

const userFormSchema = selectUserSchema.pick({
  name: true,
  email: true,
  image: true,
})

type UserFormSchema = z.infer<typeof userFormSchema>

export default function DashboadSettingsAccountForm() {
  const user = useUser()
  const form = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      image: user.image,
    } as UserFormSchema,
    onSubmit: async (values) => {
      console.log(values)
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
          validators={{ onChange: z.string() }}
          children={(field) => <input {...field.props} />}
        />
      </div>
    </form>
  )
}
