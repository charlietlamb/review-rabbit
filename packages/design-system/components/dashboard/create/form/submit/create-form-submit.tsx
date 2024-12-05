import { Button } from '@ff/design-system/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@ff/design-system/components/ui/dialog'
import {
  createCaptionAtom,
  createFilesAtom,
  createScheduleAtom,
  createSelectedConnectsAtom,
  createCaptionPlatformAtom,
  createFilesUrlAtom,
} from '@ff/design-system/atoms/dashboard/create/create-atom'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAtomValue } from 'jotai'
import CreateFormSummary from '../summary/create-form-summary'
import { scheduleContent } from '@ff/design-system/actions/schedule/schedule-content'
import Spinner from '@ff/design-system/components/misc/spinner'

export default function CreateFormSubmit() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const files = useAtomValue(createFilesAtom)
  const fileUrls = useAtomValue(createFilesUrlAtom)
  const date = useAtomValue(createScheduleAtom)
  const accounts = useAtomValue(createSelectedConnectsAtom)
  const caption = useAtomValue(createCaptionAtom)
  const captionProvider = useAtomValue(createCaptionPlatformAtom)

  function handleTriggerClick() {
    if (
      !caption.length &&
      !Array.from(captionProvider.values()).some((caption) => caption.length)
    ) {
      toast.error('Please add a caption', {
        description: 'You can add this in the caption section.',
      })
      return
    }
    if (files.length === 0) {
      toast.error('Please add files to submit', {
        description: 'You can get these from your uploads or upload directly.',
      })
      return
    }
    if (accounts.length === 0) {
      toast.error('Please select at least one account', {
        description: 'You can select these in the accounts section.',
      })
      return
    }
    if (!date || date <= new Date()) {
      toast.error('Please set a future date to schedule your post', {
        description: 'You can set this in the schedule section.',
      })
      return
    }
    setOpen(true)
  }

  async function handleScheduleClick() {
    setLoading(true)
    const response = await scheduleContent({
      type: 'short',
      providerId: 'youtube',
      scheduledTime: date.toISOString(),
      mediaUrl: fileUrls[0],
      caption: caption,
    })
    if (!response) {
      toast.error('Failed to schedule post', {
        description: 'Please try again later.',
      })
    } else {
      toast.success('Post scheduled', {
        description: 'Your post has been scheduled.',
      })
    }
    setLoading(false)
  }
  return (
    <div className="flex p-4 mt-auto w-full sticky bottom-0 bg-background">
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          className="w-full font-heading font-bold"
          variant="shine"
          onClick={handleTriggerClick}
        >
          Submit
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post summary</DialogTitle>
          </DialogHeader>
          <CreateFormSummary />
          <DialogFooter>
            <Button
              variant="shine"
              className="font-heading font-bold w-full"
              onClick={handleScheduleClick}
              disabled={loading}
            >
              {loading ? <Spinner /> : 'Schedule post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
