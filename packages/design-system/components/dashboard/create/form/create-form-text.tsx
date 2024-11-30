'use client'

import { Label } from '@dubble/design-system/components/ui/label'
import { Textarea } from '@dubble/design-system/components/ui/textarea'
import { useCharacterLimit } from '@dubble/design-system/hooks/use-character-limit'
import { createCaptionAtom } from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { useSetAtom } from 'jotai'
import CreateFormTextDialog from './create-form-text-dialog'
import { useEffect } from 'react'

export default function CreateFormText() {
  const maxLength = 180
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength })
  const setCaption = useSetAtom(createCaptionAtom)

  useEffect(() => {
    setCaption(value)
  }, [value])

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="font-heading font-bold" htmlFor="create-form-text">
          Caption
        </Label>
        <CreateFormTextDialog />
      </div>
      <Textarea
        id="create-form-text"
        value={value}
        maxLength={maxLength}
        onChange={handleChange}
        aria-describedby="characters-left-textarea"
        placeholder="Enter your caption..."
      />
      <p
        id="characters-left-textarea"
        className="mt-2 text-right text-xs text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        <span className="tabular-nums">{limit - characterCount}</span>{' '}
        characters left
      </p>
    </div>
  )
}
