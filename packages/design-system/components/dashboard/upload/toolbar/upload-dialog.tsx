'use client'

import { Button } from '@dubble/design-system/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@dubble/design-system/components/ui/dialog'
import { FileUploader } from '../file-uploader/file-uploader'
import { useState } from 'react'

export function UploadDialog({ dub = false }: { dub?: boolean }) {
  const [files, setFiles] = useState<File[]>([])
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-heading">
          Upload files {files.length > 0 && `(${files.length})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
          <DialogDescription>
            Drag and drop your files here or click to browse.
          </DialogDescription>
        </DialogHeader>
        <FileUploader
          value={files}
          maxFileCount={8}
          maxSize={8 * 1024 * 1024}
          onValueChange={setFiles}
          setOpen={setOpen}
          dub={dub}
        />
      </DialogContent>
    </Dialog>
  )
}
