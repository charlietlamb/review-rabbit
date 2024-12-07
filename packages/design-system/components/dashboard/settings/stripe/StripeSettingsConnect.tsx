'use client'

import { Button } from '@remio/design-system/components/ui/button'
import { useState } from 'react'
import { connectStripe } from '@remio/design-system/actions/stripe/connect-stripe'
import { toast } from 'sonner'

export default function StripeSettingsConnect() {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    const status = await connectStripe()
    setLoading(false)
    if (status !== 200) {
      toast.error('Failed to connect to Stripe', {
        description: 'Please try again later',
      })
    } else {
      toast.success('Connected to Stripe', {
        description: 'You can now start accepting payments',
      })
    }
  }

  return (
    <Button
      variant="shine"
      disabled={loading}
      onClick={handleClick}
      className="font-bold font-heading"
    >
      Connect to Stripe
    </Button>
  )
}
