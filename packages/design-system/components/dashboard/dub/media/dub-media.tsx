'use client'

import React from 'react'
import { dubMediaAtom } from '@dubble/design-system/atoms/dashboard/dub/dubAtom'
import { useAtom, useAtomValue } from 'jotai'
import UploadCard from '../../upload/card/upload-card'

export default function DubMedia() {
  const media = useAtomValue(dubMediaAtom)
  const [dubMedia, setDubMedia] = useAtom(dubMediaAtom)

  function handleDelete(id: string) {
    setDubMedia(dubMedia.filter((m) => m.id !== id))
  }

  if (!media) return null
  if (!media.length)
    return (
      <p className="w-full text-center font-heading text-xl flex flex-col items-center justify-center flex-grow">
        No media selected...
      </p>
    )

  return (
    <div className="grid grid-cols-1 gap-2">
      {media.map((m) => (
        <UploadCard key={m.id} upload={m} onDelete={() => handleDelete(m.id)} />
      ))}
    </div>
  )
}
