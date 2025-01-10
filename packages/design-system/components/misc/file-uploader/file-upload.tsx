import Spinner from '@rabbit/design-system/components/misc/spinner'
import { Button } from '@rabbit/design-system/components/ui/button'
import { Upload } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

export default function FileUpload({
  files,
  setFiles,
  buttonText = 'Upload Files',
  onSuccess,
}: {
  files: File[] | undefined
  setFiles: Dispatch<SetStateAction<File[] | undefined>>
  buttonText?: string
  onSuccess?: () => void
}) {
  const [loading, setLoading] = useState(false)

  async function handleUpload() {
    if (!files?.length) return
    setLoading(true)
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
    onSuccess?.()
  }
  return (
    <Button
      variant="shine"
      colors="none"
      disabled={!files?.length || loading}
      onClick={handleUpload}
    >
      {loading ? <Spinner /> : buttonText}
    </Button>
  )
}
