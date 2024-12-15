'use client'

import { FormProvider } from '@remio/design-system/components/form/form-context'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { MediationData, mediationDataSchema } from './mediation-types'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { UserCheck } from 'lucide-react'
import { Mediation } from '@remio/database'
import { addMediation } from '@remio/design-system/actions/mediations/add-mediation'
import { updateMediation } from '@remio/design-system/actions/mediations/update-mediation'
import ClientsSelect from '@remio/design-system/components/form/clients-select'
import DurationSelect from '@remio/design-system/components/form/duration-select'
import DateTimePicker from '@remio/design-system/components/form/date-time-picker'
import MediationFormDetails from './mediation-form-details'
import { Button } from '@remio/design-system/components/ui/button'
import Spinner from '@remio/design-system/components/misc/spinner'
import {
  mediationAllClientsAtom,
  mediationClientsAtom,
  mediationTabAtom,
  selectedClientsAtom,
} from '@remio/design-system/atoms/dashboard/mediations/mediation-atoms'
import { useAtomValue } from 'jotai'
import { startOfDay } from 'date-fns'

export default function MediationForm({
  mediation,
  onSuccess,
  setIsOpen,
}: {
  mediation?: Mediation
  onSuccess?: () => void
  setIsOpen?: (isOpen: boolean) => void
}) {
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      data: [],
      date: new Date(),
      duration: 0,
    } as MediationData,
    onSubmit: async ({ value }) => {
      handleSubmit(value)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: mediationDataSchema,
    },
  })

  const mediationClients = useAtomValue(mediationClientsAtom)
  const mediationAllClients = useAtomValue(mediationAllClientsAtom)
  const mediationTab = useAtomValue(mediationTabAtom)
  const selectedClients = useAtomValue(selectedClientsAtom)

  async function handleSubmit(value: MediationData) {
    setAttemptSubmitted(true)
    value.duration = Number(value.duration)
    const success = mediation
      ? await updateMediation(value, mediation.id)
      : await addMediation(value)
    if (!success) {
      toast.error('Something went wrong.', {
        description: 'Please try again later.',
      })
    } else {
      toast.success(
        mediation
          ? 'Mediation updated successfully.'
          : 'Mediation added successfully.',
        {
          description: 'You can now create invoices, payments and more.',
          icon: <UserCheck />,
        }
      )
      router.refresh()
      onSuccess?.()
    }
    setIsOpen?.(false)
  }

  function updateFromValues() {
    const isSingle = mediationTab === 'single'
    const formData = selectedClients.map((client) => ({
      clientId: client.id,
      ...(isSingle
        ? {
            ...mediationAllClients,
            clientId: client.id,
            invoice: mediationAllClients.invoice
              ? {
                  ...mediationAllClients.invoice,
                  clientId: client.id,
                }
              : null,
          }
        : mediationClients.find((c) => c.client.id === client.id)?.data || {
            clientId: client.id,
            email: false,
            invoice: null,
          }),
    }))
    form.setFieldValue('data', formData)
  }

  function validateForm(value: MediationData) {
    if (!value.data.length) {
      toast.error('Please select at least one client', {
        description: 'The select input is at the top of the form',
      })
      return false
    }

    const now = new Date()

    if (value.date < now) {
      toast.error('Mediation date cannot be in the past')
      return false
    }

    const invalidInvoices = value.data
      .filter((d) => d.invoice)
      .some((d) => {
        const dueDate = startOfDay(d.invoice?.dueDate ?? new Date())
        return dueDate < now
      })

    if (invalidInvoices) {
      toast.error('Invoice due dates cannot be in the past')
      return false
    }

    const invalidInvoiceReferences = value.data
      .filter((d) => d.invoice)
      .some((d) => !d.invoice?.reference?.length)

    if (invalidInvoiceReferences) {
      toast.error('Invoice references are required')
      return false
    }

    return true
  }

  return (
    <FormProvider value={{ attemptSubmitted }}>
      <form
        className="flex flex-col divide-y"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsLoading(true)
          updateFromValues()
          const value = {
            data: form.getFieldValue('data'),
            date: form.getFieldValue('date'),
            duration: form.getFieldValue('duration'),
          }
          if (validateForm(value)) {
            handleSubmit(value)
          }
          setIsLoading(false)
        }}
      >
        <div className="md:grid-cols-2 grid grid-cols-1 gap-4 p-4">
          <ClientsSelect form={form} className="w-full col-span-2" />
          <DateTimePicker
            form={form}
            name="date"
            label="Date"
            required
            className="w-full"
          />
          <DurationSelect
            form={form}
            name="duration"
            label="Duration"
            required
            interval={15}
            limit={240}
          />
        </div>
        <MediationFormDetails form={form} />
        <div className="p-4">
          <Button variant="shine" className="w-full">
            {isLoading ? (
              <Spinner />
            ) : mediation ? (
              'Update Mediation'
            ) : (
              'Add Mediation'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
