'use client'

import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FaGithub } from 'react-icons/fa'
import Spinner from '../misc/spinner'
import { Mail, EyeOff, Eye, UserCheck } from 'lucide-react'
import FieldInfo from '../form/field-info'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { useState } from 'react'
import AuthFormForgotPassword from './auth-form-forgot-password'
import { authClient } from '@/authClient'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof userAuthSchema>

export default function AuthFormLogin({ className }: { className?: string }) {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as FormData,
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
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

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
        <form.Field
          name="password"
          validators={{ onChange: z.string().min(8) }}
          children={(field) => (
            <div className="flex flex-col gap-1">
              <Label
                htmlFor={field.name}
                className="font-heading text-base font-semibold"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Password"
                  type={isVisible ? 'text' : 'password'}
                  className={cn(
                    '',
                    field.state.meta.errors.some((error) => error) &&
                      'peer pe-9 border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
                  )}
                />
                <button
                  className="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? 'Hide password' : 'Show password'}
                  aria-pressed={isVisible}
                  aria-controls="password"
                >
                  {isVisible ? (
                    <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Eye size={16} strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              </div>
              <FieldInfo field={field} />
            </div>
          )}
        />
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
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        type="button"
        colors="outline"
        className="font-sans gap-2"
        onClick={() => {
          setIsGitHubLoading(true)
          // signInAction('github')
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? <Spinner /> : <FaGithub className="h-4 w-4" />}{' '}
        Github
      </Button>
      <AuthFormForgotPassword />
    </div>
  )
}
