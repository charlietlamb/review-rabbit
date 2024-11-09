'use client'

import { Button } from '@/components/ui/button'
import { CircleUserRound } from 'lucide-react'
import Image from 'next/image'
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { FieldApi } from '@tanstack/react-form'
import { AspectRatio } from '../ui/aspect-ratio'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { MAX_IMAGE_SIZE } from '@/constants'

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setPreviewUrl(initPreviewUrl ?? null)
  }, [initPreviewUrl])

  const handleButtonClick = useCallback(
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
        setFileTooLarge(file.size > MAX_IMAGE_SIZE)
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
      <div className="gap-x-2 flex flex-col">
        <div className="flex items-center gap-2">
          <div
            className="size-9 shrink-0 border-input relative flex items-center justify-center overflow-hidden border rounded-lg"
            role="img"
            aria-label={
              previewUrl ? 'Preview of uploaded image' : 'Default user avatar'
            }
          >
            {previewUrl ? (
              <img
                className="object-cover w-full h-full cursor-pointer"
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
        <div className="inline-flex gap-2 mt-2 text-xs">
          <p className="text-muted-foreground truncate" aria-live="polite">
            {fileName}
          </p>{' '}
          <button
            onClick={handleRemove}
            className="hover:underline font-medium text-red-500"
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
                className="flex items-center justify-center w-full h-full overflow-hidden"
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
