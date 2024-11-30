import { FileAudio, FileText, FileVideo2 } from 'lucide-react'
import { FilePreviewProps } from './types'

export default function FilePreview({ file }: FilePreviewProps) {
  const props = {
    className: 'size-10 text-muted-foreground',
    'aria-hidden': true,
  }
  switch (file.type.split('/')[0]) {
    case 'image':
      return (
        <div key={file.name} className="relative size-10 min-w-10 min-h-10">
          <img
            src={file.preview}
            alt={file.name}
            className="absolute inset-0 h-full w-full rounded-md object-cover"
          />
        </div>
      )
    case 'video':
      return <FileVideo2 {...props} />
    case 'audio':
      return <FileAudio {...props} />

    default:
      return <FileText {...props} />
  }
}
