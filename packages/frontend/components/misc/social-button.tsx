import React from 'react'
import { cn } from '@/lib/utils'

export default function SocialButton({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 font-heading w-full px-3 py-2 justify-center transition-all duration-500',
        className
      )}
    >
      {children}
    </div>
  )
}
