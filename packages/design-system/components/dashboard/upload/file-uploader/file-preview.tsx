import { FileAudio, FileText, FileVideo2 } from 'lucide-react'
import { FilePreviewProps } from './types'

export default function FilePreview({ file }: FilePreviewProps) {
  const props = {
    className: 'size-10 text-muted-foreground',
    'aria-hidden': true,
  }
  switch (file.type.split('/')[0]) {
    case 'video':
      return <FileVideo2 {...props} />
    case 'audio':
      return <FileAudio {...props} />
    default:
      return <FileText {...props} />
  }
}
