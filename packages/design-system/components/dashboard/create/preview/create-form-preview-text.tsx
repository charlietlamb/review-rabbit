import { HighlightedText } from './highlighted-text'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@ff/design-system/lib/utils'
import { useAtomValue } from 'jotai'
import {
  createCaptionAtom,
  createCaptionPlatformAtom,
  createConnectsAtom,
  createSelectedConnectsAtom,
} from '@ff/design-system/atoms/dashboard/create/create-atom'
import { Skeleton } from '@ff/design-system/components/ui/skeleton'
import { PREVIEW_INTERVAL } from './create-form-preview-data'

export function CreateFormPreviewText({ className }: { className?: string }) {
  const accounts = useAtomValue(createSelectedConnectsAtom)
  const mainCaption = useAtomValue(createCaptionAtom)
  const platformCaptions = useAtomValue(createCaptionPlatformAtom)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentCaption, setCurrentCaption] = useState(mainCaption)

  useEffect(() => {
    if (accounts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % accounts.length)
    }, PREVIEW_INTERVAL)

    return () => clearInterval(interval)
  }, [accounts.length])

  useEffect(() => {
    const platform = accounts[currentIndex]?.providerId
    console.log(platformCaptions, platform)
    if (
      platform &&
      platformCaptions.has(platform) &&
      platformCaptions.get(platform)?.length
    ) {
      setCurrentCaption(platformCaptions.get(platform) || mainCaption)
    } else {
      setCurrentCaption(mainCaption)
    }
  }, [platformCaptions, currentIndex, mainCaption])

  if (
    !mainCaption.length &&
    !Array.from(platformCaptions.values()).some((caption) => caption.length)
  ) {
    return (
      <div className={cn('space-y-1.5', className)}>
        <Skeleton className="h-2 w-[95%]" />
        <Skeleton className="h-2 w-[90%]" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-[85%]" />
        <Skeleton className="h-2 w-[88%]" />
        <Skeleton className="h-2 w-[70%]" />
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
        >
          <div className="flex flex-col gap-1">
            <div className="line-clamp-5 overflow-y-auto">
              <HighlightedText text={currentCaption} className="text-sm" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
