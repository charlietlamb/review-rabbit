'use client'

import { Label } from '@dubble/design-system/components/ui/label'
import { Textarea } from '@dubble/design-system/components/ui/textarea'
import { createCaptionAtom } from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { useAtom } from 'jotai'
import CreateFormTextDialog from './create-form-text-dialog'

export default function CreateFormText() {
  const [caption, setCaption] = useAtom(createCaptionAtom)

  return (
    <div className="flex flex-col gap-2 p-4 pt-2">
      <div className="flex justify-between items-center">
        <Label className="font-heading font-bold" htmlFor="create-form-text">
          Caption
        </Label>
        <CreateFormTextDialog />
      </div>
      <Textarea
        id="create-form-text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        aria-describedby="characters-left-textarea"
        placeholder="Enter your caption..."
      />
    </div>
  )
}
