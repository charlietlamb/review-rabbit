import { Button } from '@remio/design-system/components/ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@remio/design-system/components/ui/dialog'
import { Dispatch, SetStateAction } from 'react'
import UploadCardDeleteDialog from './upload-card-delete-dialog'
import { useRouter } from 'next/navigation'
import {
  isAudio,
  isImage,
  isVideo,
} from '@remio/design-system/lib/misc/is-video'
import AudioPlayer from '@remio/design-system/components/misc/audio-player'
import VideoPlayer from '@remio/design-system/components/misc/video-player'
import { Media } from '@remio/database/schema/media'
import { ImagePreview } from '@remio/design-system/components/misc/image-preview'
import OtherFilePreview from '@remio/design-system/components/misc/other-file-preview'
import { downloadMedia } from '@remio/design-system/lib/media/download-media'

export default function UploadCardDialogContent({
  upload,
  setOpen,
}: {
  upload: Media
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const video = isVideo(upload.extension)
  const audio = isAudio(upload.extension)
  const image = isImage(upload.extension)
  return (
    <DialogContent className="flex flex-col gap-2">
      <DialogHeader>
        <DialogTitle className="truncate">{upload.name}</DialogTitle>
      </DialogHeader>
      <p className="text-sm text-muted-foreground">
        What do you want to do with this media?
      </p>

      {video ? (
        <VideoPlayer media={upload} />
      ) : audio ? (
        <AudioPlayer media={upload} />
      ) : image ? (
        <ImagePreview media={upload} />
      ) : (
        <OtherFilePreview media={upload} />
      )}
      <DialogFooter className="grid grid-cols-2 gap-2">
        <Button
          variant="shine"
          colors="none"
          className="font-heading text-base"
          onClick={() => {
            setOpen(false)
            downloadMedia(upload)
          }}
        >
          Download
        </Button>
        <UploadCardDeleteDialog upload={upload} setOpen={setOpen} />
      </DialogFooter>
    </DialogContent>
  )
}
