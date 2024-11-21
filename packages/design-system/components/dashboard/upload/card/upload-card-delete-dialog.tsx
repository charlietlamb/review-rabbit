import { Button } from '@dubble/design-system/components/ui/button'
import { useSetAtom } from 'jotai'
import { uploadsLastUpdatedAtom } from '@dubble/design-system/atoms/dashboard/upload/uploadsAtom'
import { toast } from 'sonner'
import { Dispatch, SetStateAction, useState } from 'react'
import { deleteMedia } from '@dubble/design-system/actions/media/delete-media'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@dubble/design-system/components/ui/dialog'
import Spinner from '@dubble/design-system/components/misc/spinner'

export default function UploadCardDeleteDialog({
  upload,
  setOpen,
}: {
  upload: Media
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const setLastUpdated = useSetAtom(uploadsLastUpdatedAtom)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button colors="destructive" className="font-heading text-base">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {upload.name}?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this media?
        </DialogDescription>
        <Button
          colors="destructive"
          className="font-heading text-base"
          onClick={async () => {
            setDeleteLoading(true)
            await deleteMedia(
              `media/${upload.id}.${upload.extension}`,
              upload.id
            )
            toast.success('Media deleted', {
              description: 'It will be removed from your uploads momentarily.',
            })
            setLastUpdated(new Date())
            setDeleteLoading(false)
            setOpen(false)
          }}
        >
          {deleteLoading ? <Spinner /> : 'Delete'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
