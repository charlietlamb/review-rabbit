'use client'

import { Button } from '@remio/design-system/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@remio/design-system/components/ui/dialog'
import { useState } from 'react'
import { FileUploader } from '@remio/design-system/components/misc/file-uploader/file-uploader'
export function UploadDialog() {
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
        />
      </DialogContent>
    </Dialog>
  )
}
