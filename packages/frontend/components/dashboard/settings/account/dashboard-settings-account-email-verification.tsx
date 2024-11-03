import { sendVerificationEmail } from '@/actions/auth/email/send-verification-email'
import useJwtClient from '@/hooks/use-jwt-client'
import { toast } from '@/hooks/use-toast'
import useUser from '@/hooks/use-user'
import { cn } from '@/lib/utils'
import { Mail, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function DashboardSettingsAccountEmailVerification() {
  const user = useUser()
  const jwt = useJwtClient()
  const [sent, setSent] = useState(false)
  return (
    <div
      className={cn(
        'flex items-center gap-2 bg-theme-200 rounded-md w-full p-2 text-theme-500 my-2 transition-all duration-200',
        !user.emailVerified &&
          !sent &&
          'cursor-pointer hover:bg-theme-300 hover:text-theme-600'
      )}
      onClick={async () => {
        if (!user.emailVerified && !sent) {
          const status = await sendVerificationEmail({ session: jwt })
          if (status === 200) {
            toast({
              title: 'Verification email sent',
              description: 'Check your email for the verification link',
            })
            setSent(true)
          }
        }
      }}
    >
      <Sparkles className="w-6 h-6" />
      {user?.emailVerified ? (
        <span className="text-green-400 font-heading">Email verified</span>
      ) : (
        <span className="text-red-400 font-heading">
          Email not verified, click to send verification email
        </span>
      )}
    </div>
  )
}
