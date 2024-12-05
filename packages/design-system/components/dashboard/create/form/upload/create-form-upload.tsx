import { FileUploader } from '@ff/design-system/components/misc/file-uploader/file-uploader'
import { useAtom, useAtomValue } from 'jotai'
import {
  createTypeAtom,
  createFilesAtom,
} from '@ff/design-system/atoms/dashboard/create/create-atom'
import { Label } from '@ff/design-system/components/ui/label'
import CreateFormUploads from './create-form-uploads'
import CreateFormUploadsReset from './create-form-uploads-reset'
import CreateFormUploadUrl from './create-form-upload-url'
import RequiredLabel from '@ff/design-system/components/misc/required-label'

export default function CreateFormUpload() {
  const createOption = useAtomValue(createTypeAtom)
  const [files, setFiles] = useAtom(createFilesAtom)
  if (!createOption || createOption.id === 'text') return null
  const maxFileCount = createOption.single ? 1 : 10

  return (
    <div className="py-4 px-4 flex flex-col gap-4">
      <RequiredLabel>Content</RequiredLabel>
      <FileUploader
        value={files.filter((file) => file instanceof File)}
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
          files={files}
          setFiles={setFiles}
        />
        <CreateFormUploadUrl
          files={files}
          setFiles={setFiles}
          disabled={files.length >= maxFileCount}
        />
      </div>
      <CreateFormUploadsReset
        files={files}
        setFiles={setFiles}
        maxFileCount={maxFileCount}
      />
    </div>
  )
}
