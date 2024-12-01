import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@dubble/design-system/components/ui/dialog'
import { Button } from '@dubble/design-system/components/ui/button'
import UrlInput from '@dubble/design-system/components/misc/url-input'
import { useState } from 'react'
import {
  createFilesAtom,
  createTypeAtom,
} from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { useAtom, useAtomValue } from 'jotai'
import { AcceptedMimeType } from '@dubble/design-system/data/file-types'

export default function CreateFormUploadUrl({
  maxFileCount,
  accept,
  disabled,
}: {
  maxFileCount: number
  accept: AcceptedMimeType[]
  disabled: boolean
}) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [valid, setValid] = useState(false)
  const [files, setFiles] = useAtom(createFilesAtom)
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
          placeholder={`https://example.com/${createType?.id}.file`}
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
