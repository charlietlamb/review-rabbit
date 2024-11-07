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
import { authClient } from '@/authClient'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useSetAtom } from 'jotai'
import { userAtom } from '@/atoms/user/user-atom'
import PasswordStrength from './password-strength'
import Name from './name'
import Email from './email'

export const userAuthSignupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

export type SignUpFormData = z.infer<typeof userAuthSignupSchema>

export default function AuthFormSignup({ className }: { className?: string }) {
  const router = useRouter()
  const setUser = useSetAtom(userAtom)
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    } as SignUpFormData,
    onSubmit: async ({ value }) => {
      const { name, email, password } = value
      setIsLoading(true)
      const response = await authClient.signUp.email({
        name,
        email,
        password,
        imageUploaded: false,
        plan: 'free',
      })
      if (response.error) {
        console.error(response.error)
      } else {
        setUser(response.data.user)
        toast.success('Welcome!', {
          description: 'You have been signed up successfully',
          icon: <UserCheck />,
        })

        router.push('/dashboard')
      }
      setIsLoading(false)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: userAuthSignupSchema,
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
        <Name form={form} />
        <Email form={form} />
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
        className="font-sans flex items-center gap-2"
        onClick={() => {
          setIsGitHubLoading(true)
          // signInAction('github')
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? <Spinner /> : <FaGithub className="h-4 w-4" />}{' '}
        Github
      </Button>
    </div>
  )
}
