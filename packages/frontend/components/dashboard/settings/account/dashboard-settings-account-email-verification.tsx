import { authClient } from '@/authClient'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import useUser from '@/hooks/use-user'
import { useState } from 'react'

export default function DashboardSettingsAccountEmailVerification() {
  const user = useUser()
  const [sent, setSent] = useState(false)
  if (!user) return null
  return user?.emailVerified ? (
    <span className="text-green-400 font-heading">Email verified</span>
  ) : (
    <Button
      variant="linkHover2"
      colors="none"
      className="px-0 text-red-400 font-heading after:bg-red-400"
      onClick={async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!sent) {
          console.log('Sending verification email')
          const response = await authClient.sendVerificationEmail({
            email: user.email,
            callbackURL: '/dashboard',
          })
          if (response.error) {
            toast({
              title: 'Error sending verification email',
              description: response.error.message,
            })
          } else {
            toast({
              title: 'Verification email sent',
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
