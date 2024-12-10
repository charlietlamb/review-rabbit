import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { Mail, User, UserCheck } from 'lucide-react'
import { useState } from 'react'
import { addClient } from '@remio/design-system/actions/clients/add-client'
import { updateClient } from '@remio/design-system/actions/clients/update-client'
import { deleteClient } from '@remio/design-system/actions/clients/delete-client'
import { zodValidator } from '@tanstack/zod-form-adapter'
import InputWithIcon from '@remio/design-system/components/form/input-with-icon'
import { Button } from '@remio/design-system/components/ui/button'
import Spinner from '@remio/design-system/components/misc/spinner'
import { FormContext } from '@remio/design-system/components/form/form-context'
import PhoneNumberInput from '@remio/design-system/components/form/phone-number-input'
import { useRouter } from 'next/navigation'
import { Client, Invoice } from '@remio/database'
import { InvoiceFormData, invoiceValidationSchema } from './invoice-schema'
import { updateInvoice } from '@remio/design-system/actions/invoices/update-invoice'
import { addInvoice } from '@remio/design-system/actions/invoices/add-invoice'
import { deleteInvoice } from '@remio/design-system/actions/invoices/delete-invoice'
import ClientSelect from '../clients/client-select'
import { clientsAtoms } from '@remio/design-system/atoms/dashboard/clients/clients-atoms'
import { useAtom } from 'jotai'

export default function InvoiceForm({
  invoice,
  client,
  setIsOpen,
  onSuccess,
}: {
  invoice?: Invoice
  client?: Client
  setIsOpen?: (isOpen: boolean) => void
  onSuccess?: () => void
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [attemptSubmitted, setAttemptSubmitted] = useState<boolean>(false)
  const [clients, setClients] = useAtom(clientsAtoms)
  const [selectedClient, setSelectedClient] = useState<Client | null>(
    client || null
  )
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      clientId: client?.id || '',
      amount: invoice?.amount || 0,
      dueDate: invoice?.dueDate || new Date(),
    } as InvoiceFormData,
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      setAttemptSubmitted(true)
      const success = invoice
        ? await updateInvoice(value, invoice.id)
        : await addInvoice(value)
      if (!success) {
        toast.error('Something went wrong.', {
          description: 'Please try again later.',
        })
      } else {
        toast.success(
          invoice
            ? 'Invoice updated successfully.'
            : 'Invoice added successfully.',
          {
            description: 'You can now create invoices, payments and more.',
            icon: <UserCheck />,
          }
        )
        router.refresh()
        if (onSuccess) onSuccess()
      }
      setIsLoading(false)
      if (setIsOpen) setIsOpen(false)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: invoiceValidationSchema,
    },
  })
  return (
    <FormContext.Provider value={{ attemptSubmitted }}>
      <form
        className="flex flex-col gap-4 w-full max-w-2xl mx-auto"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <ClientSelect
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            className="col-span-2"
          />
          <InputWithIcon
            form={form}
            name="name"
            icon={<User />}
            label="Name"
            placeholder="Name"
            type="text"
            required
          />
          <InputWithIcon
            form={form}
            name="email"
            icon={<Mail />}
            label="Email"
            placeholder="Email"
            type="email"
            required
          />
          <PhoneNumberInput
            form={form}
            name="phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
            className="col-span-2"
          />
        </div>
        <div className="flex gap-2">
          {invoice && (
            <Button
              className="w-full font-heading font-bold"
              disabled={isDeleting}
              colors="destructive"
              onClick={async () => {
                setIsDeleting(true)
                const success = await deleteInvoice(invoice.id)
                if (success) {
                  toast.success('Invoice deleted successfully.', {
                    description: 'You can always add them back later.',
                  })
                  router.refresh()
                  if (setIsOpen) setIsOpen(false)
                } else {
                  toast.error('Something went wrong.', {
                    description: 'Please try again later.',
                  })
                }
                setIsDeleting(false)
              }}
            >
              {isDeleting ? <Spinner /> : 'Delete Invoice'}
            </Button>
          )}
          <Button
            className="w-full"
            disabled={isLoading}
            variant="shine"
            colors="none"
          >
            {isLoading ? (
              <Spinner />
            ) : invoice ? (
              'Update Invoice'
            ) : (
              'Add Invoice'
            )}
          </Button>
        </div>
      </form>
    </FormContext.Provider>
  )
}
