'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@ff/design-system/lib/utils'
import { Media } from '@ff/database/schema/media'
import { useAtom } from 'jotai'
import {
  createFilesAtom,
  createPreviewUrlsAtom,
} from '@ff/design-system/atoms/dashboard/create/create-atom'
import { getPresignedUrl } from '@ff/design-system/actions/s3/upload/get-presigned-url'
import CreateFormPreviewDelete from '../delete/create-form-preview-delete'

interface CreatePreviewImageProps {
  media?: File | Media | null
  className?: string
}

export function CreatePreviewImage({
  media: propMedia,
  className,
}: CreatePreviewImageProps) {
  const [files, setFiles] = useAtom(createFilesAtom)
  const [createPreviewUrls, setCreatePreviewUrls] = useAtom(
    createPreviewUrlsAtom
  )
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchImageUrl() {
      const media = propMedia ?? files[0] ?? null
      if (!media) return

      const url =
        media instanceof File
          ? URL.createObjectURL(media)
          : typeof media === 'object' && 'id' in media && 'extension' in media
          ? await getPresignedUrl(`media/${media.id}.${media.extension}`)
          : media

      if (!url) return
      setCreatePreviewUrls([url])

      // Get image dimension
      const img = new window.Image()
      img.src = url
      img.onload = () => {
        setDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        })
        setIsLoading(false)
      }
    }

    fetchImageUrl()

    return () => {
      // Cleanup URLs when component unmounts
      createPreviewUrls.forEach((url) => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url)
      })
    }
  }, [propMedia, files])

  const handleDelete = () => {
    setFiles([])
    setCreatePreviewUrls([])
  }

  if (!createPreviewUrls.length) {
    return (
      <div className="w-full flex justify-center">
        <div
          className={cn(
            'relative w-full bg-muted rounded-lg min-h-[300px]',
            className
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">No image selected</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center group">
      <div
        className={cn(
          'relative w-full rounded-lg overflow-hidden bg-black',
          className,
          isLoading && 'animate-pulse'
        )}
        style={{
          maxWidth: '100%',
          aspectRatio:
            dimensions.width && dimensions.height
              ? `${dimensions.width} / ${dimensions.height}`
              : 'auto',
        }}
      >
        <Image
          src={createPreviewUrls[0]}
          alt="Preview"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          onLoad={() => setIsLoading(false)}
        />

        <CreateFormPreviewDelete handleDelete={handleDelete} />

        {/* Optional overlay for additional controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  )
}
