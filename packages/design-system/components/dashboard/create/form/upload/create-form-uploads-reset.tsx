import { Button } from '@ff/design-system/components/ui/button'
import { useSetAtom } from 'jotai'
import { createPreviewUrlsAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import { CreateFile } from '../types/create-form-types'

export default function CreateFormUploadsReset({
  files,
  setFiles,
  maxFileCount,
}: {
  files: CreateFile[]
  setFiles: (files: CreateFile[]) => void
  maxFileCount: number
}) {
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
