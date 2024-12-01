import { Button } from '@dubble/design-system/components/ui/button'
import { useAtom, useSetAtom } from 'jotai'
import { createFilesAtom } from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { createPreviewUrlsAtom } from '@dubble/design-system/atoms/dashboard/create/create-atom'

export default function CreateFormUploadsReset({
  maxFileCount,
}: {
  maxFileCount: number
}) {
  const [files, setFiles] = useAtom(createFilesAtom)
  const setCreatePreviewUrls = useSetAtom(createPreviewUrlsAtom)

  if (files.length < maxFileCount) return null

  return (
    <Button
      colors="outline"
      className="font-heading hover:text-red-500"
      onClick={() => {
        setFiles([])
        setCreatePreviewUrls([])
      }}
    >
      Reset current uploads
    </Button>
  )
}
