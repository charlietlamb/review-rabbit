import { useState } from 'react'
import UploadCard from './upload-card'
import { Dialog } from '@/components/ui/dialog'
import { DialogTrigger } from '@/components/ui/dialog'
import UploadCardDialogContent from './upload-card-dialog-content'

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
