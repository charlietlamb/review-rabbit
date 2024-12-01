'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@dubble/design-system/components/ui/dialog'
import { Button } from '@dubble/design-system/components/ui/button'
import { useEffect, useState } from 'react'
import {
  uploadsSearchAtom,
  uploadsSortAtom,
} from '@dubble/design-system/atoms/dashboard/upload/uploads-atom'
import { useAtom, useSetAtom } from 'jotai'
import Spinner from '@dubble/design-system/components/misc/spinner'
import {
  createFilesAtom,
  createSelectedMediaAtom,
} from '@dubble/design-system/atoms/dashboard/create/create-atom'
import Uploads from '@dubble/design-system/components/dashboard/upload/uploads'

export default function CreateFormUploads({
  maxFileCount,
  accept,
  disabled,
}: {
  maxFileCount: number
  accept: string[]
  disabled: boolean
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const setUploadsSort = useSetAtom(uploadsSortAtom)
  const setUploadsSearch = useSetAtom(uploadsSearchAtom)
  const [files, setFiles] = useAtom(createFilesAtom)
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
            onClick={() => {
              setLoading(true)
              setFiles([...files, ...selectedMedia])
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
