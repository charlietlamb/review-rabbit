import OrLabel from '@dubble/design-system/components/auth/form/or-label'
import { UploadDialog } from '../../upload/toolbar/upload-dialog'
import DubFormMediaUploads from './dub-form-media-uploads'
import DubMedia from '../media/dub-media'
import DubFormExternal from './external/dub-form-external'
import { Label } from '@dubble/design-system/components/ui/label'

export default function DubFormMedia() {
  return (
    <div className="flex flex-col gap-2 overflow-hidden flex-grow">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <DubFormMediaUploads />
        <UploadDialog dub />
      </div>
      <OrLabel text="Or add from" />
      <DubFormExternal />
      <Label className="font-heading text-xl">Selected Media</Label>
      <div className="overflow-y-auto flex flex-col gap-2 flex-grow">
        <DubMedia />
      </div>
    </div>
  )
}
