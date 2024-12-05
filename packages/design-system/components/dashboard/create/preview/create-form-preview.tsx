import { createTypeAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import { useAtomValue } from 'jotai'
import { CreateFormPreviewText } from './text/create-form-preview-text'
import { CreateFormPreviewAccounts } from './account/create-form-preview-account'

export default function CreateFormPreview() {
  const createOption = useAtomValue(createTypeAtom)
  if (!createOption) return null
  return (
    <div className="flex flex-col p-4 md:mx-auto gap-4 md:max-w-[440px]">
      {createOption.preview}
    </div>
  )
}
