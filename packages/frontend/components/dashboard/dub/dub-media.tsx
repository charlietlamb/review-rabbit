'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { durationToTime } from '@/lib/duration-to-time'
import { numberToSize } from '@/lib/number-to-size'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { fileToIcon } from '../upload/card/file-to-icon'
import DubMediaPopover from './media/dub-media-popover'
import { dubMediaAtom } from '@/atoms/dashboard/dub/dubAtom'
import { useAtomValue } from 'jotai'

export default function DubMedia() {
  const media = useAtomValue(dubMediaAtom)
  const [open, setOpen] = useState(false)

  if (!media) return null

  return (
    <>
      {media.map((m) => (
        <Popover open={open} onOpenChange={setOpen} key={m.id}>
          <PopoverTrigger asChild>
            <Card className="hover:shadow-lg hover:cursor-pointer hover:border-foreground transition-all duration-300">
              <CardHeader className="p-3 pb-0">
                <CardTitle className="font-heading text-xl flex items-center justify-between">
                  {m.name}

                  <div className="flex items-center justify-between text-muted-foreground">
                    {fileToIcon(m.extension)}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between gap-4 p-3 pt-2">
                <Badge
                  variant="secondary"
                  className="bg-primary text-primary-foreground hover:cursor-default hover:bg-primary"
                >
                  {durationToTime(m.duration)}
                </Badge>
                {numberToSize(m.size)}
              </CardContent>
            </Card>
          </PopoverTrigger>
          <DubMediaPopover media={m} setOpen={setOpen} />
        </Popover>
      ))}
    </>
  )
}
