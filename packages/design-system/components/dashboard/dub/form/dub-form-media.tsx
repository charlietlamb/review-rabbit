import OrLabel from '@dubble/design-system/components/auth/form/or-label'
import { UploadDialog } from '@dubble/design-system/components/dashboard/upload/upload-dialog'
import DubFormMediaUploads from './dub-form-media-uploads'
import DubFormExternal from './external/dub-form-external'

export default function DubFormMedia() {
  return (
    <div className="flex flex-col gap-2 overflow-hidden flex-grow">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <DubFormMediaUploads />
        <UploadDialog />
      </div>
      <OrLabel text="Or add from" />
      <DubFormExternal />
    </div>
  )
}
