import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { durationToTime } from '@/lib/misc/duration-to-time'
import { fileToIcon } from './file-to-icon'
import { numberToSize } from '@/lib/misc/number-to-size'
import { useAtom } from 'jotai'
import { dubSelectedMediaAtom } from '@/atoms/dashboard/dub/dubAtom'
import { cn } from '@/lib/utils'

export default function UploadCard({
  upload,
  dub = false,
}: {
  upload: Media
  dub?: boolean
}) {
  const [dubSelectedMedia, setDubSelectedMedia] = useAtom(dubSelectedMediaAtom)
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    if (dubSelectedMedia?.some((m) => m.id === upload.id)) setSelected(true)
    else setSelected(false)
  }, [dubSelectedMedia])

  return (
    <Card
      className={cn(
        'hover:shadow-lg hover:cursor-pointer hover:border-foreground transition-all duration-300 flex-grow w-full',
        dub && selected && 'border-foreground'
      )}
      onClick={() => {
        if (selected && dubSelectedMedia) {
          setDubSelectedMedia(
            dubSelectedMedia.filter((m) => m.id !== upload.id)
          )
        } else {
          setDubSelectedMedia([...(dubSelectedMedia ?? []), upload])
        }
      }}
    >
      <CardHeader className="p-3 pb-0">
        <CardTitle className="font-heading text-xl flex items-center justify-between text-left">
          {upload.name}

          <div className="flex items-center justify-between text-muted-foreground">
            {fileToIcon(upload.extension)}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          'flex justify-between gap-4 p-3 pt-2',
          dub && 'hover:border-foreground',
          dub && selected && 'border-foreground'
        )}
      >
        <Badge
          variant="secondary"
          className="bg-primary text-primary-foreground hover:cursor-default hover:bg-primary"
        >
          {durationToTime(upload.duration)}
        </Badge>
        {numberToSize(upload.size)}
      </CardContent>
    </Card>
  )
}
