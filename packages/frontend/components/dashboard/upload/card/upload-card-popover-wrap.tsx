import { Popover, PopoverTrigger } from '@/components/ui/popover'
import UploadCardPopover from './upload-card-popover'
import { useState } from 'react'
import UploadCard from './upload-card'

export default function UploadCardPopoverWrap({ upload }: { upload: Media }) {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full flex flex-col">
        <UploadCard upload={upload} />
      </PopoverTrigger>
      <UploadCardPopover upload={upload} setOpen={setOpen} />
    </Popover>
  )
}
