'use client'

import { Button } from '@/components/ui/button'
import { CircleUserRound } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog'
import { FieldApi } from '@tanstack/react-form'
import { AspectRatio } from '../ui/aspect-ratio'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export default function ImageUpload({
  previewUrl: initPreviewUrl,
  field,
}: {
  previewUrl?: string
  field?: FieldApi<any, any, any, any, any>
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initPreviewUrl ?? null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setPreviewUrl(initPreviewUrl ?? null)
  }, [initPreviewUrl])

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setFileName(file.name)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        field?.handleChange(file)
      }
    },
    []
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
      <div className="flex flex-col gap-x-2">
        <div className="flex items-center gap-2">
          <div
            className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-input"
            role="img"
            aria-label={
              previewUrl ? 'Preview of uploaded image' : 'Default user avatar'
            }
          >
            {previewUrl ? (
              <Image
                className="h-full w-full object-cover cursor-pointer"
                src={previewUrl}
                alt="Preview of uploaded image"
                width={32}
                height={32}
                onClick={() => setIsModalOpen(true)}
              />
            ) : (
              <div aria-hidden="true">
                <CircleUserRound
                  className="opacity-60"
                  size={16}
                  strokeWidth={2}
                />
              </div>
            )}
          </div>
          <div className="relative inline-block">
            <Button onClick={handleButtonClick} aria-haspopup="dialog">
              {fileName ? 'Change image' : 'Upload image'}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              aria-label="Upload image file"
            />
          </div>
        </div>
      </div>
      {fileName && (
        <div className="mt-2 inline-flex gap-2 text-xs">
          <p className="truncate text-muted-foreground" aria-live="polite">
            {fileName}
          </p>{' '}
          <button
            onClick={handleRemove}
            className="font-medium text-red-500 hover:underline"
            aria-label={`Remove ${fileName}`}
          >
            Remove
          </button>
        </div>
      )}
      <div className="sr-only" aria-live="polite" role="status">
        {previewUrl
          ? 'Image uploaded and preview available'
          : 'No image uploaded'}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {previewUrl && (
          <>
            <VisuallyHidden>
              <DialogTitle>Preview of uploaded image</DialogTitle>
            </VisuallyHidden>
            <DialogContent className="max-w-[50vw] max-h-[50vh] p-0 bg-transparent border-none">
              <AspectRatio
                ratio={1}
                className="h-full w-full overflow-hidden flex items-center justify-center"
              >
                <Image
                  src={previewUrl}
                  alt="Preview of uploaded image"
                  fill
                  className="object-cover"
                />
              </AspectRatio>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  )
}
