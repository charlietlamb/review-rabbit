import { FolderX } from 'lucide-react'

export default function PageEmpty() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-20 font-heading gap-4">
      <p className="text-2xl">Looks like there&apos;s nothing here...</p>
      <FolderX className="w-12 h-12" />
    </div>
  )
}
