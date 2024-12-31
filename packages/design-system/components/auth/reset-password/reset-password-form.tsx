'use client'

import { ArrowRight } from 'lucide-react'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { Button } from '@rabbit/design-system/components/ui/button'
import { resetPassword } from '@rabbit/design-system/actions/auth/user/reset-password'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import PasswordStrength from '../form/password-strength'

export const resetPasswordSchema = z.object({
  password: z.string().min(8),
})

type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      password: '',
      verifyPassword: '',
    } as ResetPasswordData,
    onSubmit: async ({ value }) => {
      const status = await resetPassword(token, value.password)
      if (status !== 200) {
        toast.error('Reset password failed', {
          description: 'Please try again',
        })
      } else {
        toast.success('Reset password successful', {
          description: 'You can now login with your new password',
          action: {
            label: 'To login',
            onClick: () => router.push('/login'),
          },
        })
      }
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: resetPasswordSchema,
    },
  })
  return (
    <form
      className="flex flex-col gap-2 w-full max-w-2xl mx-auto justify-center h-full flex-grow"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div className="flex flex-col">
        <h1 className="font-heading mx-auto text-4xl font-bold mb-4 text-foreground">
          Reset password
        </h1>
        <p className="text-muted-foreground mx-auto mb-4">
          Please enter your new password
        </p>
      </div>

      <PasswordStrength form={form} />
      <Button variant="expandIcon" Icon={ArrowRight} iconPlacement="right">
        Reset password
      </Button>
    </form>
  )
}
