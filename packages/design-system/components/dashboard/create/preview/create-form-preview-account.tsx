'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@dubble/design-system/components/ui/avatar'
import { Skeleton } from '@dubble/design-system/components/ui/skeleton'
import { cn } from '@dubble/design-system/lib/utils'
import { providerDataById } from '@dubble/design-system/lib/providers'
import { createSelectedConnectsAtom } from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { useAtomValue } from 'jotai'
import { PREVIEW_INTERVAL } from './create-form-preview-data'

export function CreateFormPreviewAccounts({
  className,
}: {
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
      <div className={cn('flex items-center gap-3', className)}>
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={accounts[currentIndex].profileImageUrl ?? undefined}
              alt={accounts[currentIndex].username ?? ''}
            />
            <AvatarFallback>
              {accounts[currentIndex].username?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-none">
              {accounts[currentIndex].username}
            </p>
            <p className="text-sm text-muted-foreground">
              {providerDataById[accounts[currentIndex].providerId].name}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
