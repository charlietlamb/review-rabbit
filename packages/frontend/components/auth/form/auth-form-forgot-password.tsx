import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { authClient } from '@/authClient'
import { toast } from 'sonner'
import Email from './email'

export const resetPasswordSchema = z.object({
  email: z.string().email(),
})

type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export default function AuthFormForgotPassword() {
  const [open, setOpen] = useState(false)
  const form = useForm({
    defaultValues: {
      email: '',
    } as ResetPasswordData,
    onSubmit: async ({ value }) => {
      handleSubmit()
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: resetPasswordSchema,
    },
  })

  async function handleSubmit() {
    const response = await authClient.forgetPassword({
      email: form.state.values.email,
      redirectTo: '/redirect/reset-password',
    })
    if (response.error) {
      toast.error('Reset password failed', {
        description: 'Please try again',
      })
    } else {
      toast.success('Reset password email sent', {
        description: 'Check your email for the reset password link',
      })
    }
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="linkHover2"
          colors="none"
          className="w-fit mx-auto hover:bg-transparent"
        >
          Forgot password?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          className="flex flex-col gap-2 w-full max-w-2xl mx-auto"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              Forgot password
            </DialogTitle>
          </DialogHeader>
          <Email form={form} />
          <DialogFooter>
            <Button
              variant="expandIcon"
              Icon={ArrowRight}
              iconPlacement="right"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleSubmit()
              }}
            >
              Send reset email
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
