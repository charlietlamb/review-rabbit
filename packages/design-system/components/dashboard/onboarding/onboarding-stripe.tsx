import { Button } from '@burse/design-system/components/ui/button'
import { Wallet } from 'lucide-react'
import { useCallback, useState } from 'react'
import { connectStripe } from '@burse/design-system/actions/stripe/connect'

export default function OnboardingStripe() {
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = useCallback(async () => {
    try {
      setIsLoading(true)
      const result = await connectStripe()

      if (result.redirectUrl) {
        window.location.href = result.redirectUrl
      } else if (result.error) {
        console.error('Failed to get OAuth URL:', result.error)
      }
    } catch (error) {
      console.error('Error connecting to Stripe:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

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
