import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@rabbit/design-system/components/ui/dialog'
import ClientsBulkUpload from '../upload/clients-bulk-upload'
import { useEffect, useState } from 'react'
import { parseCSVFile } from '@rabbit/design-system/lib/utils/csv'
import { useSetAtom } from 'jotai'
import { clientsBulkDataAtom } from '@rabbit/design-system/atoms/dashboard/clients/clients-bulk-atoms'
import ClientsBulkForm from '../form/clients-bulk-form'
export default function ClientsEditDialog({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const setClientsBulkData = useSetAtom(clientsBulkDataAtom)

  useEffect(() => {
    async function parseFile() {
      if (file) {
        const data = await parseCSVFile(file)
        setClientsBulkData(data)
      }
    }
    parseFile()
  }, [file])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Add Clients</DialogTitle>
          <DialogDescription>Add multiple clients at once.</DialogDescription>
        </DialogHeader>
        {file ? (
          <ClientsBulkForm onSuccess={() => setIsOpen(false)} />
        ) : (
          <ClientsBulkUpload setFile={setFile} />
        )}
      </DialogContent>
    </Dialog>
  )
}
