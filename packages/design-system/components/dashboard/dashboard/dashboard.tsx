'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'
import DashboardWrap from './dashboard-wrap'
import useUser from '@rabbit/design-system/hooks/use-user'
import DashboardOverview from '../overview/dashboard-overview'

export default function Dashboard({ status }: { status?: string }) {
  const user = useUser()
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
  return (
    <DashboardWrap title="Dashboard" subtitle={`Welcome back ${user?.name}!`}>
      <DashboardOverview />
    </DashboardWrap>
  )
}
