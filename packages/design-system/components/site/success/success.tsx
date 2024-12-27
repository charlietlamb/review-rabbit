import { Button } from '@burse/design-system/components/ui/button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

export function Success() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-radial from-background via-background to-primary/10" />

      {/* Animated Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-30 bg-gradient-radial from-primary/20 to-transparent"
        style={{
          background:
            'radial-gradient(circle at center, hsl(var(--primary) / 0.2) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container max-w-lg mx-auto px-4 py-16 flex flex-col items-center text-center">
        <div className="mb-8 animate-fade-in">
          <CheckCircle className="w-16 h-16 mx-auto text-primary animate-bounce-slow" />
        </div>

        <span className="text-primary font-bold uppercase tracking-wider mb-4">
          Payment Successful
        </span>

        <Balancer>
          <h1 className="font-heading mb-4 text-4xl font-bold text-foreground">
            Thank You for Your Purchase!
          </h1>
        </Balancer>

        <p className="text-muted-foreground mb-8 max-w-md">
          Your payment has been processed successfully. You should receive a
          confirmation email shortly with your purchase details.
        </p>

        <Button
          variant="outline"
          asChild
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Link href="mailto:support@burse.xyz">Need Help?</Link>
        </Button>
      </div>
    </div>
  )
}
