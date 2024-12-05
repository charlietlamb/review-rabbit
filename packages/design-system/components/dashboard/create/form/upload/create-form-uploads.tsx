'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@ff/design-system/components/ui/dialog'
import { Button } from '@ff/design-system/components/ui/button'
import { useEffect, useState } from 'react'
import {
  uploadsSearchAtom,
  uploadsSortAtom,
} from '@ff/design-system/atoms/dashboard/upload/uploads-atom'
import { useAtom, useSetAtom } from 'jotai'
import Spinner from '@ff/design-system/components/misc/spinner'
import { createSelectedMediaAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import Uploads from '@ff/design-system/components/dashboard/upload/uploads'
import { CreateFile } from '../types/create-form-types'
import { getPresignedUrl } from '@ff/design-system/actions/s3/upload/get-presigned-url'
import { Media } from '@ff/database/schema/media'

export default function CreateFormUploads({
  files,
  setFiles,
  maxFileCount,
  accept,
  disabled,
}: {
  files: CreateFile[]
  setFiles: (files: CreateFile[]) => void
  maxFileCount: number
  accept: string[]
  disabled: boolean
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const setUploadsSort = useSetAtom(uploadsSortAtom)
  const setUploadsSearch = useSetAtom(uploadsSearchAtom)
  const [selectedMedia, setSelectedMedia] = useAtom(createSelectedMediaAtom)

  useEffect(() => {
    setUploadsSort('newest')
    setUploadsSearch('')
    setSelectedMedia([])

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && open) {
        event.preventDefault()
        document.getElementById('selectMediaButton')?.click()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [setUploadsSort, setUploadsSearch, setSelectedMedia, open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          colors="outline"
          className="font-heading w-full"
          disabled={disabled}
        >
          Your Uploads
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-hidden p-0 flex flex-col gap-0">
        <DialogHeader className="border-b border-border p-2 w-full py-4 bg-background">
          <DialogTitle>Select a video to Dub</DialogTitle>
        </DialogHeader>
        <div className="flex-grow h-full overflow-y-auto">
          <Uploads
            select
            selected={selectedMedia}
            setSelected={setSelectedMedia}
            maxFileCount={maxFileCount}
            accept={accept}
          />
        </div>

        <DialogFooter className="border-t border-border p-2 w-full py-4 bg-background">
          <Button
            id="selectMediaButton"
            variant="shine"
            colors="none"
            className="font-heading w-full"
            disabled={loading || selectedMedia.length === 0}
            onClick={async () => {
              setLoading(true)
              const selectedMediaWithUrls = await Promise.all(
                selectedMedia.map(async (media) => ({
                  ...media,
                  url: await getPresignedUrl(
                    `media/${media.id}.${media.extension}`
                  ),
                }))
              )
              const validFiles = selectedMediaWithUrls.filter(
                (file): file is Media & { url: string } => file.url !== null
              ) as (Media & { url: string })[]
              setFiles([...files, ...validFiles])
              setSelectedMedia([])
              setOpen(false)
              setLoading(false)
            }}
          >
            {loading ? <Spinner /> : 'Select Media'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
