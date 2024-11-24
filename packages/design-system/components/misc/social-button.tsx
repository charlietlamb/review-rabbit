import React from 'react'
import { cn } from '@dubble/design-system/lib/utils'
import { SocialPlatformData } from '../../lib/socials'
import Spinner from './spinner'

export default function SocialButton({
  platform,
  onClick,
  loading = false,
  children,
}: {
  platform: SocialPlatformData
  onClick?: () => void
  loading?: boolean
  children?: React.ReactNode
}) {
  const { className } = platform
  return (
    <button
      className={cn(
        'flex items-center gap-1 font-heading w-full px-3 py-2 justify-center transition-all duration-300 cursor-pointer text-white rounded-md',
        className
      )}
      onClick={onClick}
    >
      {loading ? <Spinner /> : <>{children}</>}
    </button>
  )
}
