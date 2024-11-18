import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { durationToTime } from '@/lib/misc/duration-to-time'
import { fileToIcon } from './file-to-icon'
import { numberToSize } from '@/lib/misc/number-to-size'
import { useAtom } from 'jotai'
import { dubSelectedMediaAtom } from '@/atoms/dashboard/dub/dubAtom'
import { cn } from '@/lib/utils'
import env from '@/env'
import { AudioLines, Trash2 } from 'lucide-react'
import { isVideo } from '@/lib/misc/is-video'

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

  useEffect(() => {
    if (dubSelectedMedia?.some((m) => m.id === upload.id)) setSelected(true)
    else setSelected(false)
  }, [dubSelectedMedia])

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
          {video ? (
            <img
              src={`${env.NEXT_PUBLIC_AWS_S3_URL}thumbnails/${upload.id}.webp`}
              alt={upload.name}
              className="w-full h-full absolute inset-0 object-cover"
            />
          ) : (
            <AudioLines />
          )}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="font-heading text-xl flex items-center gap-2 text-left">
              <span className="truncate">{upload.name}</span>
              <div className="flex-shrink-0 text-muted-foreground">
                {fileToIcon(upload.extension)}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent
            className={cn(
              'flex justify-between items-center gap-4 p-3 pt-2',
              onSelect && 'hover:border-foreground',
              onSelect && selected && 'border-foreground'
            )}
          >
            <div className="text-muted-foreground text-sm truncate">
              {durationToTime(upload.duration)}
            </div>
            <div className="flex-shrink-0">{numberToSize(upload.size)}</div>
          </CardContent>
        </div>
        {onDelete && (
          <div
            className="flex items-center justify-center bg-red-500 hover:bg-red-400 transition-all duration-300 px-2 flex-shrink-0 group-hover:flex hidden"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
          </div>
        )}
      </Card>
    </div>
  )
}
