import { Button } from '@rabbit/design-system/components/ui/button'
import { Logo } from '@rabbit/design-system/components/site/header/logo'
import { env } from '@rabbit/env'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export function Success({ plan }: { plan: string }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background/95">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:16px_16px]" />

      {/* Card Container */}
      <div className="relative w-full max-w-md mx-auto p-8 rounded-xl bg-card shadow-lg border">
        {/* Logo */}
        <div className="w-full flex justify-center mb-8">
          <Logo logoClassName="w-10 h-10" />
        </div>

        {/* Success Icon */}
        <div className="mb-6">
          <CheckCircle className="w-12 h-12 mx-auto text-primary" />
        </div>

        {/* Content */}
        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Payment Successful
            </h1>
            <p className="text-muted-foreground text-sm">
              Thank you for your purchase! You'll receive a confirmation email
              shortly.
            </p>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>

            <Button variant="ghost" asChild className="text-sm">
              <Link href={`mailto:support@${env.NEXT_PUBLIC_DOMAIN}`}>
                Need help?
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
