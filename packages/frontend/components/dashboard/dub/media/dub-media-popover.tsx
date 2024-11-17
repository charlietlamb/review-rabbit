import { Dispatch, SetStateAction, useState } from 'react'
import { PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useAtom } from 'jotai'
import { dubMediaAtom } from '@/atoms/dashboard/dub/dubAtom'
import Spinner from '@/components/misc/spinner'

export default function DubMediaPopover({
  media,
  setOpen,
}: {
  media: Media
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [dubMedia, setDubMedia] = useAtom(dubMediaAtom)
  const [loading, setLoading] = useState(false)
  return (
    <PopoverContent className="flex flex-col w-60 gap-2">
      <p className="text-sm text-muted-foreground">Dub something else?</p>
      <Button
        colors="destructive"
        className="font-heading text-base w-full"
        onClick={() => {
          setLoading(true)
          setDubMedia(dubMedia ? dubMedia.filter((m) => m.id !== media.id) : [])
          setOpen(false)
          setLoading(false)
        }}
      >
        {loading ? <Spinner /> : 'Use other media'}
      </Button>
    </PopoverContent>
  )
}
