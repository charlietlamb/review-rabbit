'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export default function Dashboard({ status }: { status?: string }) {
  useEffect(() => {
    if (status === 'onboarding-completed') {
      toast('Welcome to Review Rabbit!', {
        description: "You've successfully connected your stripe account!",
      })
    } else if (status === 'stripe-connected') {
      toast('Stripe Connected!', {
        description: 'You can now add some products to your account!',
      })
    }
  }, [status])
  return <div>dashboard</div>
}
