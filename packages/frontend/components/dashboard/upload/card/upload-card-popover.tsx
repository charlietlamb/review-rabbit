import { Button } from '@/components/ui/button'
import { PopoverContent } from '@/components/ui/popover'
import { Dispatch, SetStateAction } from 'react'
import UploadCardDeleteDialog from './upload-card-delete-dialog'
import { useRouter } from 'next/navigation'
import { useSetAtom } from 'jotai'
import { dubMediaAtom } from '@/atoms/dashboard/dub/dubAtom'

export default function UploadCardPopover({
  upload,
  setOpen,
}: {
  upload: Media
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const router = useRouter()
  const setDubMedia = useSetAtom(dubMediaAtom)
  return (
    <PopoverContent className="flex flex-col w-60 gap-2">
      <p className="text-sm text-muted-foreground">
        What do you want to do with this media?
      </p>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="shine"
          colors="none"
          className="font-heading text-base"
          onClick={() => {
            setDubMedia([upload])
            setOpen(false)
            router.push('/dashboard/dub')
          }}
        >
          Dub
        </Button>
        <UploadCardDeleteDialog upload={upload} setOpen={setOpen} />
      </div>
    </PopoverContent>
  )
}
