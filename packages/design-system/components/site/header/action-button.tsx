'use client'

import { authClient } from '@burse/design-system/lib/authClient'
import { Button } from '@burse/design-system/components/ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@burse/design-system/lib/utils'
import Link from 'next/link'

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
  return (
    <Link
      className={cn(className, 'font-heading font-bold')}
      href={user ? '/dashboard' : '/signup'}
    >
      {user ? 'Dashboard' : 'Get Started'}
    </Link>
  )
}
