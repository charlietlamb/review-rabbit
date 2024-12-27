'use client'

import { authClient } from '@burse/design-system/lib/authClient'
import { Button } from '@burse/design-system/components/ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@burse/design-system/lib/utils'

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
      className={cn(className, 'font-heading font-bold')}
      variant="gooeyLeft"
      onClick={() => router.push(user ? '/dashboard' : '/signup')}
    >
      {user ? 'Dashboard' : 'Get Started'}
    </Button>
  )
}
