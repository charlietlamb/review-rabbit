'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import useUser from '@/hooks/use-user'

type GetStartedButtonProps = {
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function ActionButton({
  className,
  size = 'default',
}: GetStartedButtonProps) {
  const user = useUser()
  return (
    <Button size={size} asChild className={className}>
      <Link href={user ? '/dashboard' : '/sign-up'} className="cursor-pointer">
        {user ? 'Dashboard' : 'Get Started'}
      </Link>
    </Button>
  )
}
