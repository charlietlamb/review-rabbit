import { useForm } from '@tanstack/react-form'
import { ClientFormData } from './client-schema'
import { toast } from 'sonner'
import { Mail, User, UserCheck } from 'lucide-react'
import { useState } from 'react'
import { clientValidationSchema } from './client-schema'
import { addClient } from '@rabbit/design-system/actions/clients/add-client'
import { updateClient } from '@rabbit/design-system/actions/clients/update-client'
import { deleteClient } from '@rabbit/design-system/actions/clients/delete-client'
import { zodValidator } from '@tanstack/zod-form-adapter'
import InputWithIcon from '@rabbit/design-system/components/form/input/input-with-icon'
import { Button } from '@rabbit/design-system/components/ui/button'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { FormContext } from '@rabbit/design-system/components/form/form-context'
import PhoneNumberInput from '@rabbit/design-system/components/form/phone/phone-number-input'
import { useRouter } from 'next/navigation'
import { Client } from '@rabbit/database'
import { cn } from '@rabbit/design-system/lib/utils'
import DangerDialog from '@rabbit/design-system/components/misc/danger-dialog'
import ColorPicker from '@rabbit/design-system/components/form/color/color-picker'
import { useQueryClient } from '@tanstack/react-query'
export default function ClientsForm({
  client,
  setIsOpen,
  onSuccess,
  onDelete,
  className,
}: {
  client?: Client
  setIsOpen?: (isOpen: boolean) => void
  onSuccess?: () => void
  onDelete?: () => void
  className?: string
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [attemptSubmitted, setAttemptSubmitted] = useState<boolean>(false)
  const router = useRouter()
  const queryClient = useQueryClient()
  const form = useForm({
    defaultValues: {
      name: client?.name || '',
      email: client?.email || '',
      phoneNumber: client?.phone || '',
      color: client?.color || 'blue',
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
        onSuccess?.()
        queryClient.invalidateQueries({
          queryKey: ['clients'],
        })
        router.refresh()
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
      <form className={cn('flex flex-col gap-4 w-full mx-auto', className)}>
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
          <ColorPicker form={form} name="color" label="Color" />
        </div>
        <div className="flex gap-2">
          {client && (
            <DangerDialog
              title="Delete Client"
              description="Are you sure you want to delete this client? This action cannot be undone."
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
                onDelete?.()
              }}
            >
              <Button
                className="w-full font-heading font-bold"
                disabled={isDeleting}
                colors="destructive"
              >
                {isDeleting ? <Spinner /> : 'Delete Client'}
              </Button>
            </DangerDialog>
          )}
          <Button
            className="w-full"
            disabled={isLoading}
            variant="shine"
            colors="none"
            onClick={() => {
              form.handleSubmit()
            }}
          >
            {isLoading ? <Spinner /> : client ? 'Update Client' : 'Add Client'}
          </Button>
        </div>
      </form>
    </FormContext.Provider>
  )
}
