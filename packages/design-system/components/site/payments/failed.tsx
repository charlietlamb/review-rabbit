import { Button } from '@rabbit/design-system/components/ui/button'
import { getEnv } from '@rabbit/env'
import { XCircle } from 'lucide-react'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

interface FailureProps {
  message?: string
}

export function Failed({ message = 'Payment failed' }: FailureProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-radial from-background via-background to-destructive/10" />

      {/* Animated Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-30 bg-gradient-radial from-destructive/20 to-transparent"
        style={{
          background:
            'radial-gradient(circle at center, hsl(var(--destructive) / 0.2) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container max-w-lg mx-auto px-4 py-16 flex flex-col items-center text-center">
        <div className="mb-8 animate-fade-in">
          <XCircle className="w-16 h-16 mx-auto text-destructive animate-bounce-slow" />
        </div>

        <span className="text-destructive font-bold uppercase tracking-wider mb-4">
          Payment Failed
        </span>

        <Balancer>
          <h1 className="font-heading mb-4 text-4xl font-bold text-foreground">
            Something Went Wrong
          </h1>
        </Balancer>

        <p className="text-muted-foreground mb-8 max-w-md">
          {decodeURIComponent(message)}. Please try again or contact our support
          team for assistance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="default"
            asChild
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <Link href={`mailto:help@${getEnv().NEXT_PUBLIC_DOMAIN}`}>
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
