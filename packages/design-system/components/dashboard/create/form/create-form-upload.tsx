import { FileUploader } from '@dubble/design-system/components/misc/file-uploader/file-uploader'
import { useAtom, useAtomValue } from 'jotai'
import {
  createTypeAtom,
  createFilesAtom,
  createMediaAtom,
} from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { Label } from '@dubble/design-system/components/ui/label'
import CreateFormUploads from './create-form-uploads'

export default function CreateFormUpload() {
  const createOption = useAtomValue(createTypeAtom)
  const [files, setFiles] = useAtom(createFilesAtom)
  const [media, setMedia] = useAtom(createMediaAtom)
  if (!createOption || createOption.id === 'text') return null
  const maxFileCount = createOption.single ? 1 : 10

  return (
    <>
      <Label className="font-heading font-bold">Upload Content</Label>
      <FileUploader
        value={files}
        maxSize={8 * 1024 * 1024}
        onValueChange={setFiles}
        setOpen={() => {}}
        accept={createOption.acceptedFileTypes}
        maxFileCount={maxFileCount - media.length}
        disabled={files.length + media.length >= maxFileCount}
        noPreview
      />
      <CreateFormUploads
        maxFileCount={maxFileCount - files.length}
        accept={createOption.acceptedMimeTypes ?? []}
        disabled={files.length + media.length >= maxFileCount}
      />
    </>
  )
}
