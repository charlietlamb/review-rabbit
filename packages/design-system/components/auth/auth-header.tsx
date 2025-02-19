'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Badge } from '../ui/badge'

export default function AuthHeader({ login }: { login: boolean }) {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-2 items-center max-w-sm">
      <Badge
        className="flex items-center gap-2 cursor-pointer bg-background border border-border text-foreground hover:bg-border"
        onClick={() => router.push(login ? '/signup' : '/login')}
      >
        {login ? 'Create a new account' : 'Login to existing account'}
        <ArrowRight />
      </Badge>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold font-heading text-center text-foreground">
          {login
            ? 'Sign in to Review Rabbit'
            : 'Create your Review Rabbit account'}
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          {login ? 'Welcome back!' : 'Welcome to Review Rabbit!'}
        </p>
      </div>
    </div>
  )
}
