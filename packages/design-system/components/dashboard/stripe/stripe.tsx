'use client'

import { Button } from '@burse/design-system/components/ui/button'
import DashboardContentHeader from '../header/dashboard-content-header'
import StripeConnects from './stripe-connects'
import { useCallback, useState } from 'react'
import { connectStripe } from '@burse/design-system/actions/stripe/connect'
import Spinner from '@burse/design-system/components/misc/spinner'

export default function Stripe() {
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
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Stripe"
        subtitle="Connect your stripe account"
      />
      <div className="p-4 flex flex-col gap-2">
        <p className="font-heading">Your connected stripe accounts</p>
        <StripeConnects />
        <Button
          variant="shine"
          className="mt-2"
          onClick={handleConnect}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Connect another account'}
        </Button>
      </div>
    </div>
  )
}
