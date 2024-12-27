'use client'

import { Button } from '@burse/design-system/components/ui/button'
import { CircleUserRound, X } from 'lucide-react'
import Image from 'next/image'
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FieldApi } from '@tanstack/react-form'
import { AspectRatio } from '@burse/design-system/components/ui/aspect-ratio'
import { MAX_FILE_SIZE } from '@burse/design-system/lib/constants'

export default function ImageUpload({
  previewUrl: initPreviewUrl,
  field,
  setFileTooLarge,
}: {
  previewUrl?: string
  field?: FieldApi<any, any, any, any, any>
  setFileTooLarge: Dispatch<SetStateAction<boolean>>
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
        setFileTooLarge(file.size > MAX_FILE_SIZE)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        field?.handleChange(file)
      }
    },
    [field, setFileTooLarge]
  )

  const handleRemove = useCallback(() => {
    setFileName(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

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
