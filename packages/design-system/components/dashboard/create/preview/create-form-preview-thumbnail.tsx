import { Button } from '@ff/design-system/components/ui/button'
import { Check } from 'lucide-react'
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

export default function CreateFormPreviewThumbnail({ url }: { url: string }) {
  return (
    <div className="absolute bottom-20 left-0 right-0 w-full flex justify-center px-4">
      <div className="w-full flex justify-center px-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="p-2 w-full h-auto z-50 bg-background/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer font-heading hover:text-white"
            >
              Select thumbnail
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select thumbnail</DialogTitle>
            </DialogHeader>
            <CreateFormPreviewThumbnailSelect url={url} />
            <DialogFooter>
              <Button variant="shine" className="font-heading font-bold">
                Select thumbnail
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
