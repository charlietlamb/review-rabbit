import { Button } from '@ff/design-system/components/ui/button'
import { X } from 'lucide-react'

export default function CreateFormPreviewDelete({
  handleDelete,
}: {
  handleDelete: () => void
}) {
  return (
    <div className="absolute top-2 right-2 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-red-500"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
