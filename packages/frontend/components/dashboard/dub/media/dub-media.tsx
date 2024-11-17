'use client'

import React, { useState } from 'react'
import { dubMediaAtom } from '@/atoms/dashboard/dub/dubAtom'
import { useAtomValue } from 'jotai'
import DubMediaPopover from './dub-media-popover'

export default function DubMedia() {
  const media = useAtomValue(dubMediaAtom)
  const [open, setOpen] = useState(false)

  if (!media) return null
  if (!media.length)
    return (
      <p className="w-full text-center font-heading text-xl flex flex-col items-center justify-center flex-grow">
        No media selected...
      </p>
    )

  return (
    <>
      {media.map((m) => (
        <DubMediaPopover media={m} key={m.id} />
      ))}
    </>
  )
}
