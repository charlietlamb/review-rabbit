import { Button } from '@ff/design-system/components/ui/button'
import { useSetAtom } from 'jotai'
import { createThumbnailTimeAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ff/design-system/components/ui/dialog'
import CreateFormPreviewThumbnailSelect from './create-form-preview-thumbnail-select'
import { useState } from 'react'
import { cn } from '@ff/design-system/lib/utils'

export default function CreateFormPreviewThumbnail({
  url,
  className,
  buttonClassName,
  mobile = false,
}: {
  url: string
  className?: string
  buttonClassName?: string
  mobile?: boolean
}) {
  const setCreateThumbnailTime = useSetAtom(createThumbnailTimeAtom)
  const [time, setTime] = useState(0)
  const handleSelectThumbnail = () => {
    setCreateThumbnailTime(time)
  }

  return (
    <div className={cn('w-full flex justify-center', className)}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'p-2 w-full h-auto cursor-pointer font-heading',
              buttonClassName
            )}
          >
            Select thumbnail
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select thumbnail</DialogTitle>
          </DialogHeader>
          <CreateFormPreviewThumbnailSelect
            url={url}
            time={time}
            setTime={setTime}
            mobile={mobile}
          />
          <DialogFooter>
            <Button
              variant="shine"
              className="font-heading font-bold w-full"
              onClick={handleSelectThumbnail}
            >
              Select thumbnail
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
