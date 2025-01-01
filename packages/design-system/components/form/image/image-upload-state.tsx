'use client'

import { Button } from '@rabbit/design-system/components/ui/button'
import { CircleUserRound, X } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AspectRatio } from '@rabbit/design-system/components/ui/aspect-ratio'

export default function ImageUploadState({
  previewUrl: initPreviewUrl,
  name,
  value,
  onChange,
}: {
  previewUrl?: string
  name: string
  value?: File | string | null
  onChange: (value: File | null) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initPreviewUrl ?? null
  )

  useEffect(() => {
    setPreviewUrl(initPreviewUrl ?? null)
  }, [initPreviewUrl])

  const handleThumbnailClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      fileInputRef.current?.click()
    },
    []
  )

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setFileName(file.name)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        onChange(file)
      }
    },
    [onChange]
  )

  const handleRemove = useCallback(() => {
    setFileName(null)
    setPreviewUrl(null)
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onChange])

  return (
    <div>
      <div className="relative inline-flex">
        <Button
          variant="outline"
          className="relative size-16 overflow-hidden p-0"
          onClick={handleThumbnailClick}
          aria-label={previewUrl ? 'Change image' : 'Upload image'}
        >
          {previewUrl ? (
            <AspectRatio ratio={1}>
              <Image
                className="h-full w-full object-cover"
                src={previewUrl}
                alt="Preview of uploaded image"
                width={40}
                height={40}
                style={{ objectFit: 'cover' }}
              />
            </AspectRatio>
          ) : (
            <div aria-hidden="true">
              <CircleUserRound
                className="opacity-60"
                size={16}
                strokeWidth={2}
              />
            </div>
          )}
        </Button>
        {previewUrl && (
          <Button
            onClick={handleRemove}
            size="icon"
            variant="destructive"
            className="absolute -right-2 -top-2 size-6 rounded-full border-2 border-background"
            aria-label="Remove image"
          >
            <X size={16} />
          </Button>
        )}
        <input
          type="file"
          name={name}
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          aria-label="Upload image file"
        />
      </div>
      {fileName && (
        <p className="mt-2 text-xs text-muted-foreground">{fileName}</p>
      )}
      <div className="sr-only" aria-live="polite" role="status">
        {previewUrl
          ? 'Image uploaded and preview available'
          : 'No image uploaded'}
      </div>
    </div>
  )
}
