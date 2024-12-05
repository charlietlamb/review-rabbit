'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@ff/design-system/components/ui/avatar'
import { Skeleton } from '@ff/design-system/components/ui/skeleton'
import { cn } from '@ff/design-system/lib/utils'
import { providerDataById } from '@ff/design-system/lib/providers'
import { createSelectedConnectsAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import { useAtomValue } from 'jotai'
import { PREVIEW_INTERVAL } from '../create-form-preview-data'

export function CreateFormPreviewAccounts({
  skeleton = true,
  className,
}: {
  skeleton?: boolean
  className?: string
}) {
  const accounts = useAtomValue(createSelectedConnectsAtom)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (accounts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % accounts.length)
    }, PREVIEW_INTERVAL)

    return () => clearInterval(interval)
  }, [accounts.length])

  if (accounts.length === 0) {
    return (
      skeleton && (
        <div className={cn('flex items-center gap-3 h-[40px]', className)}>
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      )
    )
  }
  if (!accounts[currentIndex]) return null
  return (
    <div className={cn('relative h-[40px] overflow-hidden', className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 absolute w-full"
        >
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage
              src={accounts[currentIndex].profileImageUrl ?? undefined}
              alt={accounts[currentIndex].username ?? ''}
            />
            <AvatarFallback>
              {accounts[currentIndex].username?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-medium leading-none truncate">
              {accounts[currentIndex].username}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {providerDataById[accounts[currentIndex].providerId].name}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
