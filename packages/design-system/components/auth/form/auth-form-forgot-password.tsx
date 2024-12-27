import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@burse/design-system/components/ui/dialog'
import { Button } from '@burse/design-system/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { authClient } from '@burse/design-system/lib/authClient'
import { toast } from 'sonner'
import InputWithIcon from '@burse/design-system/components/form/input/input-with-icon'
import { MailIcon } from 'lucide-react'
import { FormProvider } from '@burse/design-system/components/form/form-context'

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
  const [attemptSubmitted, setAttemptSubmitted] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="linkHover2"
          colors="none"
          className="w-fit mx-auto hover:bg-transparent text-foreground"
        >
          Forgot password?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <FormProvider value={{ attemptSubmitted }}>
          <form
            className="flex flex-col gap-2 w-full max-w-2xl mx-auto"
            onSubmit={(e) => {
              setAttemptSubmitted(true)
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
            <DialogDescription>
              Enter your email below and we&apos;ll send you a link to reset
              your password.
            </DialogDescription>
            <InputWithIcon
              form={form}
              name="email"
              placeholder="Email"
              icon={<MailIcon />}
              required
              type="email"
              label="Email"
            />
            <DialogFooter>
              <Button
                variant="expandIcon"
                colors="primary"
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
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
