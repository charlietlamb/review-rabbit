'use client'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@rabbit/design-system/components/ui/dialog'
import { z } from 'zod'
import Password from '../form/password'
import PasswordStrength from '../form/password-strength'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { toast } from 'sonner'
import { Button } from '@rabbit/design-system/components/ui/button'
import { useState } from 'react'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { updatePassword } from '@rabbit/design-system/actions/auth/user/update-password'
import { FormProvider } from '@rabbit/design-system/components/form/form-context'

const updatePasswordSchema = z.object({
  password: z.string().min(1),
  newPassword: z.string().min(1),
})

type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>

export default function UpdatePassword() {
  const [open, setOpen] = useState(false)
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)
  const form = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
    } as UpdatePasswordSchema,
    onSubmit: async () => {
      handleSubmit()
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: updatePasswordSchema,
    },
  })

  async function handleSubmit() {
    const res = await updatePassword(
      form.state.values.password,
      form.state.values.newPassword
    )
    if (!res) {
      toast.error('Failed to update password', {
        description:
          'Please try again, make sure your current password is correct.',
      })
    } else {
      toast.success('Password updated', {
        description: 'Your password has been updated successfully.',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full font-heading font-bold">
          Update password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update password</DialogTitle>
        <FormProvider value={{ attemptSubmitted }}>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <Password form={form} />
            <PasswordStrength
              form={form}
              name="newPassword"
              label="New password"
            />
            <Button
              variant="shine"
              disabled={form.state.isSubmitting}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleSubmit()
              }}
            >
              {form.state.isSubmitting ? <Spinner /> : 'Update password'}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
