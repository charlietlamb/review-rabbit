import { Button } from '@ff/design-system/components/ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@ff/design-system/components/ui/dialog'
import { Dispatch, SetStateAction } from 'react'
import UploadCardDeleteDialog from './upload-card-delete-dialog'
import { useRouter } from 'next/navigation'
import { useSetAtom } from 'jotai'
import { isAudio, isImage, isVideo } from '@ff/design-system/lib/misc/is-video'
import AudioPlayer from '@ff/design-system/components/misc/audio-player'
import VideoPlayer from '@ff/design-system/components/misc/video-player'
import { Media } from '@ff/database/schema/media'
import { ImagePreview } from '@ff/design-system/components/misc/image-preview'
import OtherFilePreview from '@ff/design-system/components/misc/other-file-preview'

export default function UploadCardDialogContent({
  upload,
  setOpen,
}: {
  upload: Media
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const router = useRouter()
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
            router.push('/dashboard/create')
          }}
        >
          Create a post
        </Button>
        <UploadCardDeleteDialog upload={upload} setOpen={setOpen} />
      </DialogFooter>
    </DialogContent>
  )
}
