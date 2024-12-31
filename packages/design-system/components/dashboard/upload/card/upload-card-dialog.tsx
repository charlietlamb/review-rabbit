import { useState } from 'react'
import UploadCard from './upload-card'
import { Dialog } from '@rabbit/design-system/components/ui/dialog'
import { DialogTrigger } from '@rabbit/design-system/components/ui/dialog'
import UploadCardDialogContent from './upload-card-dialog-content'
import { Media } from '@rabbit/database/schema/media'

export default function UploadCardDialog({ upload }: { upload: Media }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full flex flex-col">
        <UploadCard upload={upload} />
      </DialogTrigger>
      <UploadCardDialogContent upload={upload} setOpen={setOpen} />
    </Dialog>
  )
}
