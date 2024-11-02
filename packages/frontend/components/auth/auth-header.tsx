'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Badge } from '../ui/badge'

export default function AuthHeader({ login }: { login: boolean }) {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-2 items-center">
      <Badge
        className="flex items-center gap-2 cursor-pointer bg-theme-100 text-theme-900 hover:bg-theme-200 border-theme-300"
        onClick={() => router.push(login ? '/signup' : '/login')}
      >
        {login ? 'Create a new account' : 'Login to existing account'}
        <ArrowRight />
      </Badge>
      <h1 className="title-size font-bold font-heading">
        {login ? 'Sign in to remio' : 'Create your remio account'}
      </h1>
      <p>
        {login
          ? 'Welcome back! Please enter your details.'
          : 'Welcome to remio! Please enter your details.'}
      </p>
    </div>
  )
}
