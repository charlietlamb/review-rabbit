'use client'

import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import * as z from 'zod'
import { cn } from '@remio/design-system/lib/utils'
import { Button } from '@remio/design-system/components/ui/button'
import Spinner from '../../misc/spinner'
import { UserCheck, UserX } from 'lucide-react'
import { zodValidator } from '@tanstack/zod-form-adapter'
import AuthFormForgotPassword from './auth-form-forgot-password'
import { authClient } from '@remio/design-system/lib/authClient'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Password from './password'
import OrLabel from './or-label'
import OAuth from '../oauth/oauth'
import InputWithIcon from '@remio/design-system/components/form/input-with-icon'
import { MailIcon } from 'lucide-react'
import { FormProvider } from '@remio/design-system/components/form/form-context'
import { useState } from 'react'

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type LoginFormData = z.infer<typeof userAuthSchema>

export default function AuthFormLogin({ className }: { className?: string }) {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginFormData,
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      const response = await authClient.signIn.email({
        email: value.email,
        password: value.password,
        callbackURL: '/dashboard',
      })
      if (response.error) {
        toast.error('We could not find an account with those details', {
          description: 'Please try again',
          icon: <UserX />,
        })
      } else {
        toast.success('Welcome back!', {
          description: 'You have been signed in successfully',
          icon: <UserCheck />,
        })
        router.push('/dashboard')
      }
      setIsLoading(false)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: userAuthSchema,
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [attemptSubmitted, setAttemptSubmitted] = useState<boolean>(false)
  return (
    <FormProvider value={{ attemptSubmitted }}>
      <div
        className={cn(
          'flex flex-col gap-4 w-full max-w-2xl mx-auto',
          className
        )}
      >
        <form
          className={cn(
            'flex flex-col gap-2 w-full max-w-2xl mx-auto',
            className
          )}
          onSubmit={(e) => {
            setAttemptSubmitted(true)
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <InputWithIcon
            form={form}
            name="email"
            placeholder="Email"
            icon={<MailIcon />}
            required
            type="email"
            label="Email"
          />
          <Password form={form} />
          <Button
            className="w-full"
            disabled={isLoading}
            variant="shine"
            colors="none"
          >
            {isLoading && <Spinner />}
            Sign In
          </Button>
        </form>
        <OrLabel />
        <OAuth />
        <AuthFormForgotPassword />
      </div>
    </FormProvider>
  )
}
