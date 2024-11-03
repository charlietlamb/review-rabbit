import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { ArrowRight, Mail } from 'lucide-react'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { cn } from '@/lib/utils'
import FieldInfo from '../form/field-info'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { sendResetPasswordEmail } from '@/actions/auth/email/send-reset-password-email'
import { toast } from '@/hooks/use-toast'

export const resetPasswordSchema = z.object({
  email: z.string().email(),
})

type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export default function AuthFormForgotPassword() {
  const form = useForm({
    defaultValues: {
      email: '',
    } as ResetPasswordData,
    onSubmit: async ({ value }) => {
      const status = await sendResetPasswordEmail(value.email)
      if (status === 404) {
        toast({
          title: 'Reset password email sent',
          description: 'Check your email for the reset password link',
          variant: 'destructive',
        })
      } else if (status === 200) {
        toast({
          title: 'Reset password email sent',
          description: 'Check your email for the reset password link',
        })
      }
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: resetPasswordSchema,
    },
  })
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="linkHover2"
          colors="ghost"
          className="w-auto hover:bg-transparent"
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
            <DialogTitle className="font-heading">Forgot password</DialogTitle>
          </DialogHeader>

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
          <DialogFooter>
            <Button
              variant="expandIcon"
              Icon={ArrowRight}
              iconPlacement="right"
            >
              Send reset email
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
