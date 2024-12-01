import { FileUploader } from '@dubble/design-system/components/misc/file-uploader/file-uploader'
import { useAtom, useAtomValue } from 'jotai'
import {
  createTypeAtom,
  createFilesAtom,
} from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { Label } from '@dubble/design-system/components/ui/label'
import CreateFormUploads from './create-form-uploads'
import CreateFormUploadsReset from './create-form-uploads-reset'
import CreateFormUploadUrl from './create-form-upload-url'

export default function CreateFormUpload() {
  const createOption = useAtomValue(createTypeAtom)
  const [files, setFiles] = useAtom(createFilesAtom)
  if (!createOption || createOption.id === 'text') return null
  const maxFileCount = createOption.single ? 1 : 10

  return (
    <div className="py-4 px-4 flex flex-col gap-4">
      <Label className="font-heading font-bold">Upload Content</Label>
      <FileUploader
        value={files.filter((file) => file instanceof File)}
        maxSize={8 * 1024 * 1024}
        onValueChange={setFiles}
        setOpen={() => {}}
        accept={createOption.acceptedFileTypes}
        maxFileCount={maxFileCount}
        disabled={files.length >= maxFileCount}
        noPreview
      />
      <div className="flex gap-2">
        <CreateFormUploads
          maxFileCount={maxFileCount - files.length}
          accept={createOption.acceptedMimeTypes ?? []}
          disabled={files.length >= maxFileCount}
        />
        <CreateFormUploadUrl
          maxFileCount={maxFileCount - files.length}
          accept={createOption.acceptedMimeTypes ?? []}
          disabled={files.length >= maxFileCount}
        />
      </div>
      <CreateFormUploadsReset maxFileCount={maxFileCount} />
    </div>
  )
}
