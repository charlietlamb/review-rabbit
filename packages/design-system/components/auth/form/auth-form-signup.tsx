'use client'

import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import * as z from 'zod'
import { cn } from '@burse/design-system/lib/utils'
import { Button } from '@burse/design-system/components/ui/button'
import Spinner from '../../misc/spinner'
import { Mail, User, UserCheck } from 'lucide-react'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { authClient } from '@burse/design-system/lib/authClient'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import PasswordStrength from './password-strength'
import OAuth from '../oauth/oauth'
import OrLabel from './or-label'
import InputWithIcon from '@burse/design-system/components/form/input/input-with-icon'
import { FormProvider } from '@burse/design-system/components/form/form-context'
import { useState } from 'react'

export const userAuthSignupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

export type SignUpFormData = z.infer<typeof userAuthSignupSchema>

export default function AuthFormSignup({ className }: { className?: string }) {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    } as SignUpFormData,
    onSubmit: async ({ value }) => {
      const { name, email, password } = value
      setIsLoading(true)
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        imageUploaded: false,
        plan: 'free',
      })
      if (error) {
        toast.error('Something went wrong', {
          description: 'Make sure you email is correct and try again.',
        })
      } else {
        toast.success('Welcome!', {
          description: 'You have been signed up successfully',
          icon: <UserCheck />,
        })
        router.push('/dashboard')
      }
      router.push('/dashboard')
      setIsLoading(false)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: userAuthSignupSchema,
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
            icon={<User />}
            placeholder="Name"
            name="name"
            form={form}
            label="Name"
            type="text"
            required
          />
          <InputWithIcon
            icon={<Mail />}
            placeholder="Email"
            name="email"
            form={form}
            label="Email"
            type="email"
            required
          />
          <PasswordStrength form={form} />
          <Button
            className="w-full"
            disabled={isLoading}
            variant="shine"
            colors="none"
          >
            {isLoading && <Spinner />}
            Sign Up
          </Button>
        </form>
        <OrLabel />
        <OAuth />
      </div>
    </FormProvider>
  )
}
