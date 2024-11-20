'use client'

import { dubMediaAtom } from '@/atoms/dashboard/dub/dubAtom'
import InputWithStart from '@/components/misc/input-with-start'
import SocialButton from '@/components/misc/social-button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAtom } from 'jotai'
import { Dispatch, SetStateAction, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { ExternalPlatformData } from './external'

export default function ExternalForm({
  platform,
  setOpen,
  children,
}: {
  platform: ExternalPlatformData
  setOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}) {
  const { start, placeholder, icon, className, name } = platform
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dubMedia, setDubMedia] = useAtom(dubMediaAtom)
  const urlSchema = z.string().url()

  function handleSubmit() {
    {
      const url = `${start}${text}`
      const name = url
      const size = 0
      const extension = ''
      const duration = 0

      const valid = urlSchema.safeParse(url).success
      if (!valid) return setError(platform.error)

      setLoading(true)
      const id = uuidv4()
      setDubMedia([
        ...(dubMedia ?? []),
        {
          id,
          source: 'external',
          name,
          url,
          createdAt: new Date(),
          updatedAt: new Date(),
          size,
          extension,
          duration,
          mimeType: 'audio/mp3',
          language: null,
          deletedAt: null,
          userId: '',
        },
      ])

      setLoading(false)
      setOpen(false)
    }
  }
  return (
    <DialogContent className="gap-4">
      <div className="flex flex-col gap-2">
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Add a {children} video to be dubbed.
        </DialogDescription>
      </div>
      <InputWithStart platform={platform} text={text} setText={setText} />
      <SocialButton
        platform={platform}
        onClick={handleSubmit}
        loading={loading}
      />
      {error && <p className="text-red-500">{error}</p>}
    </DialogContent>
  )
}
