import { FileUploader } from '@rabbit/design-system/components/misc/file-uploader/file-uploader'
import { useState, useEffect } from 'react'

export default function ClientsBulkUpload({
  setFile,
}: {
  setFile: (file: File) => void
}) {
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    if (files.length) {
      setFile(files[0])
    }
  }, [files])

  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      accept={{
        'text/csv': ['.csv'],
      }}
    />
  )
}
