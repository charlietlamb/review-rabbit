import { uploadMedia } from '@/actions/s3/media/upload/upload-media'
import Spinner from '@/components/misc/spinner'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function FileUpload({
  files,
  durations,
}: {
  files: File[] | undefined
  durations: Record<string, number>
}) {
  const [loading, setLoading] = useState(false)
  async function handleUpload() {
    if (!files?.length) return
    setLoading(true)
    await uploadMedia(files, durations)
    setLoading(false)
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
