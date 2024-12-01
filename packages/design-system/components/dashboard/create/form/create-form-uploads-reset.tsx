import { Button } from '@dubble/design-system/components/ui/button'
import { useAtom, useSetAtom } from 'jotai'
import {
  createFilesAtom,
  createMediaAtom,
} from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { createPreviewUrlsAtom } from '@dubble/design-system/atoms/dashboard/create/create-atom'

export default function CreateFormUploadsReset({
  maxFileCount,
}: {
  maxFileCount: number
}) {
  const [files, setFiles] = useAtom(createFilesAtom)
  const [media, setMedia] = useAtom(createMediaAtom)
  const setCreatePreviewUrls = useSetAtom(createPreviewUrlsAtom)

  if (files.length + media.length < maxFileCount) return null

  return (
    <Button
      colors="outline"
      className="font-heading hover:text-red-500"
      onClick={() => {
        setFiles([])
        setMedia([])
        setCreatePreviewUrls([])
      }}
    >
      Reset current uploads
    </Button>
  )
}
