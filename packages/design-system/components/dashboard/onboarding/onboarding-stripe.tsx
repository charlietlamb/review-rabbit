import { Button } from '@burse/design-system/components/ui/button'
import { Wallet } from 'lucide-react'
import { handleConnect } from '@burse/design-system/lib/stripe/handle-connect'
import { useState } from 'react'

export default function OnboardingStripe() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <Wallet className="h-12 w-12 text-primary" />
      <p className="text-sm text-muted-foreground text-center">
        Connect your Stripe account to start accepting payments securely from
        your clients.
      </p>
      <Button
        variant="outline"
        className="w-full"
        onClick={handleConnect}
        disabled={isLoading}
      >
        {isLoading ? 'Connecting...' : 'Connect Stripe Account'}
      </Button>
    </div>
  )
}
