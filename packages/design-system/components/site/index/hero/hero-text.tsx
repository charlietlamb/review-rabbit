'use client'

import { ArrowRight } from 'lucide-react'
import Balancer from 'react-wrap-balancer'
import { Badge } from '@burse/design-system/components/ui/badge'
import { useRouter } from 'next/navigation'

export function HeroText() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center gap-6">
      <Badge
        variant="outline"
        className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        onClick={() => router.push('/signup')}
      >
        Start accepting payments in minutes
        <ArrowRight size={16} />
      </Badge>
      <h1 className="max-w-2xl font-heading text-5xl font-semibold sm:text-6xl tracking-tight text-foreground text-center">
        <Balancer>Stripe Payments Made Simple</Balancer>
      </h1>
      <p className="max-w-lg text-center text-lg text-muted-foreground sm:text-xl">
        Seamlessly handle payments and webhooks. Focus on your business logic.
      </p>
    </div>
  )
}
