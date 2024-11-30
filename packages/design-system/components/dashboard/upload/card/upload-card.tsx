import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from '@dubble/design-system/components/ui/card'
import { Badge } from '@dubble/design-system/components/ui/badge'
import { durationToTime } from '@dubble/design-system/lib/misc/duration-to-time'
import { fileToIcon } from './file-to-icon'
import { numberToSize } from '@dubble/design-system/lib/misc/number-to-size'
import { useAtom } from 'jotai'
import { dubSelectedMediaAtom } from '@dubble/design-system/atoms/dashboard/dub/dubAtom'
import { cn } from '@dubble/design-system/lib/utils'
import { env } from '@dubble/env'
import { AudioLines, Dot, FileIcon, Trash2 } from 'lucide-react'
import {
  isAudio,
  isImage,
  isVideo,
} from '@dubble/design-system/lib/misc/is-video'
import { Media } from '@dubble/database/schema/media'

export default function UploadCard({
  upload,
  onSelect,
  onDelete,
}: {
  upload: Media
  onSelect?: () => void
  onDelete?: () => void
}) {
  const [dubSelectedMedia, setDubSelectedMedia] = useAtom(dubSelectedMediaAtom)
  const [selected, setSelected] = useState(false)
  const video = isVideo(upload.extension)
  const image = isImage(upload.extension)
  const audio = isAudio(upload.extension)

  useEffect(() => {
    if (dubSelectedMedia?.some((m) => m.id === upload.id)) setSelected(true)
    else setSelected(false)
  }, [dubSelectedMedia, upload])

  return (
    <div className="w-full group">
      <Card
        className={cn(
          'hover:shadow-lg hover:cursor-pointer hover:border-foreground transition-all duration-300 flex overflow-hidden',
          onSelect && selected && 'border-foreground'
        )}
        onClick={onSelect}
      >
        <div className="aspect-square w-20 min-w-[5rem] relative flex items-center justify-center border-r border-border">
          {video || image ? (
            <img
              src={
                video
                  ? `${env.NEXT_PUBLIC_AWS_S3_URL}thumbnails/${upload.id}.webp`
                  : `${env.NEXT_PUBLIC_AWS_S3_URL}media/${upload.id}.${upload.extension}`
              }
              alt={upload.name}
              className="w-full h-full absolute inset-0 object-cover"
            />
          ) : audio ? (
            <AudioLines />
          ) : (
            <FileIcon />
          )}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="font-heading text-lg flex justify-between items-center gap-2 text-left">
              <span className="truncate">{upload.name}</span>
              <div className="flex-shrink-0 text-muted-foreground">
                {fileToIcon(upload.extension)}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent
            className={cn(
              'flex items-center p-3 pt-0 text-muted-foreground text-sm',
              onSelect && 'hover:border-foreground',
              onSelect && selected && 'border-foreground'
            )}
          >
            <div className="flex-shrink-0">{numberToSize(upload.size)}</div>
            {!!upload.duration && (
              <>
                <Dot />
                <div className="truncate">
                  {durationToTime(upload.duration)}
                </div>
              </>
            )}
          </CardContent>
        </div>
        {onDelete && (
          <div
            className="items-center justify-center bg-red-500 hover:bg-red-400 transition-all duration-300 px-2 flex-shrink-0 group-hover:flex hidden"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
          </div>
        )}
      </Card>
    </div>
  )
}
