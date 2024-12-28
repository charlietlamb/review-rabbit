'use client'

import { Button } from '@burse/design-system/components/ui/button'
import DashboardContentHeader from '../header/dashboard-content-header'
import StripeConnects from './stripe-connects'
import { useState } from 'react'
import Spinner from '@burse/design-system/components/misc/spinner'
import { handleConnect } from '@burse/design-system/lib/stripe/handle-connect'
export default function Stripe() {
  const [isLoading, setIsLoading] = useState(false)

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
