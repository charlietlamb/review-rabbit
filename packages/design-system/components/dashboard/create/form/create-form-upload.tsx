import { FileUploader } from '@dubble/design-system/components/misc/file-uploader/file-uploader'
import { useAtom, useAtomValue } from 'jotai'
import {
  createTypeAtom,
  createFilesAtom,
} from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { Label } from '@dubble/design-system/components/ui/label'

export default function CreateFormUpload() {
  const createOption = useAtomValue(createTypeAtom)
  const [files, setFiles] = useAtom(createFilesAtom)

  if (!createOption || createOption.id === 'text') return null
  return (
    <>
      <Label className="font-heading font-bold">Upload Content</Label>
      <FileUploader
        value={files}
        maxSize={8 * 1024 * 1024}
        onValueChange={setFiles}
        setOpen={() => {}}
        accept={createOption.acceptedFileTypes}
        maxFileCount={createOption.single ? 1 : 10}
        noPreview
      />
    </>
  )
}
