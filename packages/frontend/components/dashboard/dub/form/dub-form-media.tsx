import OrLabel from '@/components/auth/form/or-label'
import { UploadDialog } from '../../upload/toolbar/upload-dialog'
import DubFormMediaUploads from './dub-form-media-uploads'
import DubMedia from '../dub-media'

export default function DubFormMedia() {
  return (
    <div className="flex flex-col gap-2">
      <DubFormMediaUploads />
      <OrLabel text="Or" />
      <UploadDialog dub />
      <DubMedia />
    </div>
  )
}
