import { createTypeAtom } from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { useAtomValue } from 'jotai'
import { CreateFormPreviewAccounts } from './create-form-preview-account'
import { CreateFormPreviewText } from './create-form-preview-text'

export default function CreateFormPreview() {
  const createOption = useAtomValue(createTypeAtom)
  if (!createOption) return null
  return (
    <div className="flex flex-col p-4 mx-auto gap-4 max-w-[440px]">
      {createOption.preview}
      <CreateFormPreviewAccounts />
      <CreateFormPreviewText />
    </div>
  )
}
