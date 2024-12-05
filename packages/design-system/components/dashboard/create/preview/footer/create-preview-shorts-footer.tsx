import { CreateFormPreviewAccounts } from '../account/create-form-preview-account'
import { CreateFormPreviewText } from '../text/create-form-preview-text'

export default function CreatePreviewShortsFooter() {
  return (
    <div className="absolute bottom-16 w-full text-white px-4 flex flex-col gap-2">
      <CreateFormPreviewText skeleton={false} />
      <CreateFormPreviewAccounts skeleton={false} />
    </div>
  )
}
