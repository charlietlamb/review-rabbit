import { Button } from '@ff/design-system/components/ui/button'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { useSetAtom } from 'jotai'
import { createThumbnailTimeAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'

export default function CreateFormPreviewThumbnailSelect({
  currentTime,
}: {
  currentTime: number
}) {
  const [loading, setLoading] = useState(false)
  const setThumbnailTime = useSetAtom(createThumbnailTimeAtom)

  const handleThumbnailSelect = async () => {
    setLoading(true)
    setThumbnailTime(currentTime)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <div className="absolute bottom-20 left-0 right-0 w-full flex justify-center px-4">
      <div className="w-full flex justify-center px-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleThumbnailSelect}
          className="p-2 w-full h-auto z-50 bg-background/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer font-heading hover:text-white"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              Thumbnail selected <Check className="h-4 w-4" />
            </div>
          ) : (
            'Choose this frame as the thumbnail'
          )}
        </Button>
      </div>
    </div>
  )
}
