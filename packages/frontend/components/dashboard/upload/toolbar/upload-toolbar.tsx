import { UploadDialog } from './upload-dialog'
import UploadToolbarLayout from './upload-toolbar-layout'
import UploadToolbarSearch from './upload-toolbar-search'
import UploadToolbarSort from './upload-toolbar-sort'

export default function UploadToolbar() {
  return (
    <div className="flex items-center gap-4">
      <UploadToolbarSearch />
      <UploadToolbarSort />
      <UploadToolbarLayout />
      <UploadDialog />
    </div>
  )
}
