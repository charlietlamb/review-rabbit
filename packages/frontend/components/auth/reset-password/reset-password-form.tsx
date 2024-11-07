'use client'

import { ArrowRight } from 'lucide-react'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { Button } from '@/components/ui/button'
import { resetPassword } from '@/actions/auth/user/reset-password'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Password from '../form/password'

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
      className="flex flex-col gap-2 w-full max-w-2xl mx-auto"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <h1 className="font-heading mx-auto text-4xl font-bold mb-4">
        Reset password
      </h1>
      <Password form={form} />
      <Button variant="expandIcon" Icon={ArrowRight} iconPlacement="right">
        Reset password
      </Button>
    </form>
  )
}
