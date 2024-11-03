'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { userAtom } from '@/atoms/user/user-atom'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'

type GetStartedButtonProps = {
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function ActionButton({
  className,
  size = 'default',
}: GetStartedButtonProps) {
  const user = useAtomValue(userAtom)
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
