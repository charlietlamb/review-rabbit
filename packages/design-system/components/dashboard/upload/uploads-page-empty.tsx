import { UploadDialog } from '@dubble/design-system/components/dashboard/upload/upload-dialog'

export default function UploadsPageEmpty() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-20 font-heading gap-4">
      <p className="text-2xl">Looks like there&apos;s nothing here...</p>
      <UploadDialog />
    </div>
  )
}
