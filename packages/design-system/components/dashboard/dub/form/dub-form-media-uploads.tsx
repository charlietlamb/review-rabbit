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
import Uploads from '../../upload/uploads'
import {
  uploadsSearchAtom,
  uploadsSortAtom,
} from '@dubble/design-system/atoms/dashboard/upload/uploadsAtom'
import { useAtom, useSetAtom } from 'jotai'
import {
  dubSelectedMediaAtom,
  dubMediaAtom,
} from '@dubble/design-system/atoms/dashboard/dub/dubAtom'
import Spinner from '@dubble/design-system/components/misc/spinner'

export default function DubFormMediaUploads() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const setUploadsSort = useSetAtom(uploadsSortAtom)
  const setUploadsSearch = useSetAtom(uploadsSearchAtom)
  const [dubSelectedMedia, setDubSelectedMedia] = useAtom(dubSelectedMediaAtom)
  const [dubMedia, setDubMedia] = useAtom(dubMediaAtom)

  useEffect(() => {
    setUploadsSort('newest')
    setUploadsSearch('')
    setDubSelectedMedia([])

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
  }, [setUploadsSort, setUploadsSearch, setDubSelectedMedia, open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button colors="outline" className="font-heading">
          Your Uploads
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-hidden p-0 flex flex-col gap-0">
        <DialogHeader className="border-b border-border p-2 w-full py-4 bg-background">
          <DialogTitle>Select a video to Dub</DialogTitle>
        </DialogHeader>
        <div className="flex-grow h-full overflow-y-auto">
          <Uploads dub />
        </div>

        <DialogFooter className="border-t border-border p-2 w-full py-4 bg-background">
          <Button
            id="selectMediaButton"
            variant="shine"
            colors="none"
            className="font-heading w-full"
            disabled={loading || dubSelectedMedia.length === 0}
            onClick={() => {
              setLoading(true)
              setDubMedia([...(dubMedia || []), ...dubSelectedMedia])
              setDubSelectedMedia([])
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
