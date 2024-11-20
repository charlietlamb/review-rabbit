'use client'

import { authClient } from '@/authClient'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
type GetStartedButtonProps = {
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function ActionButton({
  className,
  size = 'default',
}: GetStartedButtonProps) {
  const session = authClient.useSession()
  const user = session.data?.user
  const router = useRouter()
  return (
    <Button
      size={size}
      className={className}
      variant="gooeyLeft"
      onClick={() => router.push(user ? '/dashboard' : '/signup')}
    >
      {user ? 'Dashboard' : 'Get Started'}
    </Button>
  )
}
