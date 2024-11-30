import { fetchMediaFromIds } from '@dubble/design-system/actions/media/fetch-media-from-ids'
import { uploadMedia } from '@dubble/design-system/actions/media/upload-media'
import { dubMediaAtom } from '@dubble/design-system/atoms/dashboard/dub/dubAtom'
import { uploadsLastUpdatedAtom } from '@dubble/design-system/atoms/dashboard/upload/uploads-atom'
import Spinner from '@dubble/design-system/components/misc/spinner'
import { Button } from '@dubble/design-system/components/ui/button'
import { useAtom, useSetAtom } from 'jotai'
import { Upload } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

export default function FileUpload({
  files,
  durations,
  setFiles,
  setOpen,
  setProgress,
  dub = false,
}: {
  files: File[] | undefined
  durations: Record<string, number>
  setFiles: Dispatch<SetStateAction<File[] | undefined>>
  setOpen?: Dispatch<SetStateAction<boolean>>
  setProgress: Dispatch<SetStateAction<Record<string, number>>>
  dub?: boolean
}) {
  const [loading, setLoading] = useState(false)
  const setLastUpdated = useSetAtom(uploadsLastUpdatedAtom)
  const [dubMedia, setDubMedia] = useAtom(dubMediaAtom)

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
    if (dub) {
      const media = await fetchMediaFromIds(ids)
      setDubMedia([...(dubMedia ?? []), ...media])
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
