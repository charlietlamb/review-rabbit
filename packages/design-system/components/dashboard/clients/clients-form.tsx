import { useForm } from '@tanstack/react-form'
import { ClientFormData } from './client-schema'
import { toast } from 'sonner'
import { Mail, User, UserCheck } from 'lucide-react'
import { useState } from 'react'
import { clientValidationSchema } from './client-schema'
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
import { Client } from '@remio/database'

export default function ClientsForm({
  client,
  setIsOpen,
  onSuccess,
}: {
  client?: Client
  setIsOpen?: (isOpen: boolean) => void
  onSuccess?: () => void
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [attemptSubmitted, setAttemptSubmitted] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      name: client?.name || '',
      email: client?.email || '',
      phoneNumber: client?.phoneNumber || '',
    } as ClientFormData,
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      setAttemptSubmitted(true)
      const success = client
        ? await updateClient(value, client.id)
        : await addClient(value)
      if (!success) {
        toast.error('Something went wrong.', {
          description: 'Please try again later.',
        })
      } else {
        toast.success(
          client
            ? 'Client updated successfully.'
            : 'Client added successfully.',
          {
            description: 'You can now create invoices, payments and more.',
            icon: <UserCheck />,
          }
        )
        router.refresh()
        onSuccess?.()
      }
      setIsLoading(false)
      setIsOpen?.(false)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: clientValidationSchema,
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
          {client && (
            <Button
              className="w-full font-heading font-bold"
              disabled={isDeleting}
              colors="destructive"
              onClick={async () => {
                setIsDeleting(true)
                const success = await deleteClient(client.id)
                if (success) {
                  toast.success('Client deleted successfully.', {
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
              {isDeleting ? <Spinner /> : 'Delete Client'}
            </Button>
          )}
          <Button
            className="w-full"
            disabled={isLoading}
            variant="shine"
            colors="none"
          >
            {isLoading ? <Spinner /> : client ? 'Update Client' : 'Add Client'}
          </Button>
        </div>
      </form>
    </FormContext.Provider>
  )
}
