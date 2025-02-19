'use client'

import { ArrowBigUpDash, ArrowRight } from 'lucide-react'
import Balancer from 'react-wrap-balancer'
import { Badge } from '@rabbit/design-system/components/ui/badge'
import { useRouter } from 'next/navigation'

export function HeroText() {
  const router = useRouter()

  return (
    <div className="flex flex-col lg:items-start items-center gap-2 w-full">
      <Badge
        variant="outline"
        className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        onClick={() => router.push('/signup')}
      >
        <div className="flex items-center gap-2">
          <ArrowBigUpDash size={16} />
          Start outranking your competitors today
        </div>
        <ArrowRight size={16} />
      </Badge>
      <h1 className="font-heading text-5xl font-bold sm:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50 text-center lg:text-left">
        <Balancer>Google Reviews Made Easy</Balancer>
      </h1>
      <p className="sm:max-w-lg max-w-md text-center text-lg text-muted-foreground sm:text-xl lg:text-left">
        Effortlessly collect and manage Google reviews to boost your online
        reputation and attract more customers.
      </p>
    </div>
  )
}
