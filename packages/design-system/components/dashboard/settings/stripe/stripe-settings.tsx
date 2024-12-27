'use client'

import { StripeConnect } from '@burse/database/schema/stripe-connects'
import DashboardContentHeader from '@burse/design-system/components/dashboard/header/dashboard-content-header'
import StripeSettingsConnect from './stripe-settings-connect'
import { useEffect } from 'react'
import { toast } from 'sonner'
import StripeSettingsConnected from './stripe-settings-connected'
import StripeSettingsOnboarding from './stripe-settings-onboarding'
import { stripeConnectAtom } from '@burse/design-system/atoms/dashboard/settings/stripe/stripe-atoms'
import { useSetAtom } from 'jotai'

export default function StripeSettings({
  stripeAccount,
  success,
}: {
  stripeAccount: StripeConnect | undefined
  success?: string
}) {
  const setStripeConnectAtom = useSetAtom(stripeConnectAtom)
  useEffect(() => {
    if (success) {
      toast.success('Stripe account successfully connected', {
        description: 'You can now receive payments',
      })
    }
  }, [success])
  useEffect(() => {
    setStripeConnectAtom(stripeAccount)
  }, [stripeAccount])
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Stripe Settings"
        subtitle="Manage how you receive payments"
      />
      <div className="flex flex-col gap-4 p-4">
        {stripeAccount && stripeAccount.onboardingCompleted ? (
          <StripeSettingsConnected />
        ) : stripeAccount ? (
          <StripeSettingsOnboarding />
        ) : (
          <StripeSettingsConnect />
        )}
      </div>
    </div>
  )
}
