import { uploadMedia } from '@/actions/media/upload-media'
import Spinner from '@/components/misc/spinner'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

export default function FileUpload({
  files,
  durations,
  setFiles,
  setOpen,
}: {
  files: File[] | undefined
  durations: Record<string, number>
  setFiles: Dispatch<SetStateAction<File[] | undefined>>
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [loading, setLoading] = useState(false)
  async function handleUpload() {
    if (!files?.length) return
    setLoading(true)
    await uploadMedia(files, durations)
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
    setLoading(false)
    setOpen(false)
  }
  return (
    <>
      <Button
        variant="shine"
        colors="none"
        disabled={!files?.length || loading}
        onClick={handleUpload}
      >
        {loading ? <Spinner /> : 'Upload Files'}
      </Button>
    </>
  )
}
