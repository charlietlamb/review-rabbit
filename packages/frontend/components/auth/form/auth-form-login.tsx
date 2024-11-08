'use client'

import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import Spinner from '../../misc/spinner'
import { UserCheck } from 'lucide-react'
import { zodValidator } from '@tanstack/zod-form-adapter'
import AuthFormForgotPassword from './auth-form-forgot-password'
import { authClient } from '@/authClient'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Email from './email'
import Password from './password'
import OrLabel from './or-label'
import OAuth from '../oauth/oauth'

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
      })
      if (response.error) {
        console.error(response.error)
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
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)

  return (
    <div
      className={cn('flex flex-col gap-4 w-full max-w-2xl mx-auto', className)}
    >
      <form
        className={cn(
          'flex flex-col gap-2 w-full max-w-2xl mx-auto',
          className
        )}
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Email form={form} />
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
  )
}
