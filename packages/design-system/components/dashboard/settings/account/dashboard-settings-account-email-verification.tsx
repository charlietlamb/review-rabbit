'use client'

import { authClient } from '@remio/design-system/lib/authClient'
import { Button } from '@remio/design-system/components/ui/button'
import useUser from '@remio/design-system/hooks/use-user'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DashboardSettingsAccountEmailVerification() {
  const user = useUser()
  const [sent, setSent] = useState(false)
  if (!user) return null
  return user?.emailVerified ? (
    <Button
      variant="outline"
      className="font-heading after:bg-emerald-400 px-0 text-emerald-400 w-full cursor-default"
    >
      Email verified
    </Button>
  ) : (
    <Button
      variant="outline"
      className="font-heading after:bg-red-400 px-0 text-red-400 w-full"
      onClick={async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!sent) {
          const response = await authClient.sendVerificationEmail({
            email: user.email,
            callbackURL: '/redirect/verify',
          })
          if (response.error) {
            toast.error(response.error.message, {
              description: 'Please try again later',
            })
          } else {
            toast.success('Verification email sent', {
              description: 'Check your email for the verification link',
            })
            setSent(true)
          }
        }
      }}
    >
      Email not verified, click to send verification email
    </Button>
  )
}
