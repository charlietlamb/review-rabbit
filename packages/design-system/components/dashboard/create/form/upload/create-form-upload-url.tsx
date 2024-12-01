import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ff/design-system/components/ui/dialog'
import { Button } from '@ff/design-system/components/ui/button'
import UrlInput from '@ff/design-system/components/misc/url-input'
import { useState } from 'react'
import { createTypeAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import { useAtomValue } from 'jotai'
import { CreateFile } from '../types/create-form-types'

export default function CreateFormUploadUrl({
  files,
  setFiles,
  disabled,
  placeholder = `https://example.com/file`,
}: {
  files: CreateFile[]
  setFiles: (files: CreateFile[]) => void
  disabled: boolean
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [valid, setValid] = useState(false)
  const createType = useAtomValue(createTypeAtom)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          colors="outline"
          className="font-heading w-full"
          disabled={disabled}
        >
          Use an external URL
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Use an external URL</DialogTitle>
        </DialogHeader>
        <UrlInput
          value={url}
          setValue={setUrl}
          mediaTypes={createType?.acceptedMimeTypes || []}
          valid={valid}
          setValid={setValid}
          placeholder={placeholder}
        />
        <p className="text-sm text-muted-foreground">
          Feedflow will automatically try to access and validate your resource.
        </p>
        <DialogFooter>
          <Button
            disabled={!valid}
            onClick={() => {
              setFiles([...files, url])
              setUrl('')
              setValid(false)
              setOpen(false)
            }}
            variant="outline"
            className="font-heading w-full"
          >
            Add to post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
