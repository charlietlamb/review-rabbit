import { CreateFormPreviewAccounts } from '../account/create-form-preview-account'
import { CreateFormPreviewText } from '../text/create-form-preview-text'

export default function CreatePreviewFooter() {
  return (
    <>
      <CreateFormPreviewAccounts />
      <CreateFormPreviewText />
    </>
  )
}
