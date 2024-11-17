import DubMediaPopoverContent from './dub-media-popover-content'

import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { durationToTime } from '@/lib/duration-to-time'
import { numberToSize } from '@/lib/number-to-size'
import { fileToIcon } from '../../upload/card/file-to-icon'
import { useState } from 'react'

export default function DubMediaPopover({ media }: { media: Media }) {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Card className="hover:shadow-lg hover:cursor-pointer hover:border-foreground transition-all duration-300">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="font-heading text-xl flex items-center justify-between">
              {media.name}

              <div className="flex items-center justify-between text-muted-foreground">
                {fileToIcon(media.extension)}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between gap-4 p-3 pt-2">
            <Badge
              variant="secondary"
              className="bg-primary text-primary-foreground hover:cursor-default hover:bg-primary"
            >
              {durationToTime(media.duration)}
            </Badge>
            {numberToSize(media.size)}
          </CardContent>
        </Card>
      </PopoverTrigger>
      <DubMediaPopoverContent media={media} setOpen={setOpen} />
    </Popover>
  )
}
