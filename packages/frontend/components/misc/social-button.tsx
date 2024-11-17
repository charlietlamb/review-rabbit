import React from 'react'
import { cn } from '@/lib/utils'
import { ExternalPlatformData } from '../dashboard/dub/form/external/external'
import Spinner from './spinner'

export default function SocialButton({
  platform,
  onClick,
  loading,
}: {
  platform: ExternalPlatformData
  onClick?: () => void
  loading?: boolean
}) {
  const { name, icon, className } = platform
  return (
    <div
      className={cn(
        'flex items-center gap-1 font-heading w-full px-3 py-2 justify-center transition-all duration-300 cursor-pointer text-white',
        className
      )}
      onClick={onClick}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {icon}
          <p className="hidden md:inline-block">{name}</p>
        </>
      )}
    </div>
  )
}
