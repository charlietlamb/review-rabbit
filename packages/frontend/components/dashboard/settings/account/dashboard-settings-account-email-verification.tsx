import { authClient } from '@/authClient'
import { Button } from '@/components/ui/button'
import useUser from '@/hooks/use-user'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DashboardSettingsAccountEmailVerification() {
  const user = useUser()
  const [sent, setSent] = useState(false)
  if (!user) return null
  return user?.emailVerified ? (
    <span className="font-heading text-green-400">Email verified</span>
  ) : (
    <Button
      variant="linkHover2"
      colors="none"
      className="font-heading after:bg-red-400 px-0 text-red-400"
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
