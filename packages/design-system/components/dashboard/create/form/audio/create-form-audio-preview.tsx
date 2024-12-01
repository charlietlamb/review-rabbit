import { useAtom } from 'jotai'
import { createAudioFilesAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import { Button } from '@ff/design-system/components/ui/button'
import { AudioLines, X } from 'lucide-react'

export default function CreateFormAudioPreview() {
  const [audioFiles, setAudioFiles] = useAtom(createAudioFilesAtom)
  if (!audioFiles.length) return null

  const audioFile = audioFiles[0]
  const name = typeof audioFile === 'string' ? audioFile : audioFile.name

  const handleDelete = () => {
    setAudioFiles([])
  }
  return (
    <div className="absolute top-4 w-full px-4 z-50 pointer-events-none">
      <Button
        className="flex gap-2 bg-background/50 items-center max-w-[160px] pointer-events-auto"
        variant="outline"
      >
        <AudioLines className="w-4 h-4 min-w-4 min-h-4" />
        <p className="text-xs truncate">{name}</p>
        <div
          className="flex items-center justify-center"
          onClick={handleDelete}
        >
          <X className="w-4 h-4 min-w-4 min-h-4 hover:text-red-500" />
        </div>
      </Button>
    </div>
  )
}
