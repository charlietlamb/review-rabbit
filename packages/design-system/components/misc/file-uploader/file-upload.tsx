import { uploadMedia } from '@burse/design-system/actions/media/upload-media'
import { uploadsLastUpdatedAtom } from '@burse/design-system/atoms/dashboard/upload/uploads-atom'
import Spinner from '@burse/design-system/components/misc/spinner'
import { Button } from '@burse/design-system/components/ui/button'
import { useSetAtom } from 'jotai'
import { Upload } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

export default function FileUpload({
  files,
  durations,
  setFiles,
  setOpen,
  setProgress,
}: {
  files: File[] | undefined
  durations: Record<string, number>
  setFiles: Dispatch<SetStateAction<File[] | undefined>>
  setOpen?: Dispatch<SetStateAction<boolean>>
  setProgress: Dispatch<SetStateAction<Record<string, number>>>
}) {
  const [loading, setLoading] = useState(false)
  const setLastUpdated = useSetAtom(uploadsLastUpdatedAtom)

  async function handleUpload() {
    if (!files?.length) return
    setLoading(true)
    const ids = await uploadMedia(files, durations, setProgress)
    if (!ids || ids.length !== files.length) {
      toast.error('Failed to upload files', {
        description: 'Please try again.',
      })
      setOpen?.(false)
      setLoading(false)
      return
    }
    setFiles([])
    toast.success(
      `${files.length} file${
        files.length !== 1 ? 's' : ''
      } uploaded successfully`,
      {
        description: 'They are now ready to dub and available in your uploads.',
        icon: <Upload />,
      }
    )
    setLastUpdated(new Date())
    setLoading(false)
    setOpen?.(false)
  }
  return (
    <Button
      variant="shine"
      colors="none"
      disabled={!files?.length || loading}
      onClick={handleUpload}
    >
      {loading ? <Spinner /> : 'Upload Files'}
    </Button>
  )
}
