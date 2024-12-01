'use client'

import { Textarea } from '@ff/design-system/components/ui/textarea'
import { createCaptionAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import { useAtom } from 'jotai'
import CreateFormTextDialog from './create-form-text-dialog'
import RequiredLabel from '@ff/design-system/components/misc/required-label'

export default function CreateFormText() {
  const [caption, setCaption] = useAtom(createCaptionAtom)

  return (
    <div className="flex flex-col gap-2 p-4 pt-2">
      <div className="flex justify-between items-center">
        <RequiredLabel>Caption</RequiredLabel>
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
