import {
  createTypeAtom,
  createCaptionAtom,
} from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { useAtomValue } from 'jotai'
import { HighlightedText } from '../preview/highlighted-text'

export default function CreateFormPreview() {
  const createOption = useAtomValue(createTypeAtom)
  const createCaption = useAtomValue(createCaptionAtom)
  if (!createOption) return null
  return (
    <div className="flex flex-col gap-4 p-4">
      {createOption.preview}
      {createCaption && (
        <HighlightedText
          className="max-w-[400px] mx-auto w-full"
          text={createCaption}
        />
      )}
    </div>
  )
}
