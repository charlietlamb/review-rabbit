'use client'

import { FormProvider } from '@remio/design-system/components/form/form-context'
import { useEffect, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { MediationData, mediationDataSchema } from './mediation-types'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { FilePenLine, UserCheck } from 'lucide-react'
import { MediationWithData } from '@remio/database/schema/mediations'
import { addMediation } from '@remio/design-system/actions/mediations/add-mediation'
import { updateMediation } from '@remio/design-system/actions/mediations/update-mediation'
import ClientsSelect from '@remio/design-system/components/form/clients/clients-select'
import DurationSelect from '@remio/design-system/components/form/date/duration-select'
import DateTimePicker from '@remio/design-system/components/form/date/date-time-picker'
import MediationFormDetails from './mediation-form-details'
import { Button } from '@remio/design-system/components/ui/button'
import Spinner from '@remio/design-system/components/misc/spinner'
import {
  mediationAllClientsAtom,
  mediationClientsAtom,
  mediationTabAtom,
  selectedClientsAtom,
} from '@remio/design-system/atoms/dashboard/mediations/mediation-atoms'
import { useAtom, useAtomValue } from 'jotai'
import InputWithIcon from '@remio/design-system/components/form/input/input-with-icon'
import ColorPicker from '@remio/design-system/components/form/color/color-picker'
import { nearestDateValue } from '@remio/design-system/lib/utils/nearest-date-value'
import MediationNotes from './mediation-notes'

export default function MediationForm({
  mediation,
  onSuccess,
  setIsOpen,
}: {
  mediation?: MediationWithData
  onSuccess?: () => void
  setIsOpen?: (isOpen: boolean) => void
}) {
  console.log(mediation)
  const [attemptSubmitted, setAttemptSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      data:
        mediation?.data.map((d) => ({
          clientId: d.client.id,
          email: false,
          invoice: d.invoice
            ? {
                clientId: d.client.id,
                amount: Number(d.invoice.amount),
                dueDate: d.invoice.dueDate,
                reference: d.invoice.reference || undefined,
              }
            : null,
        })) || [],
      title: mediation?.title || '',
      notes: mediation?.notes || null,
      color: mediation?.color || 'blue',
      date: mediation?.date || nearestDateValue(new Date()),
      duration: mediation?.duration || 60,
    } as MediationData,
    onSubmit: async ({ value }) => {
      handleSubmit(value)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: mediationDataSchema,
    },
  })

  const [mediationClients, setMediationClients] = useAtom(mediationClientsAtom)
  const [mediationAllClients, setMediationAllClients] = useAtom(
    mediationAllClientsAtom
  )
  const [mediationTab, setMediationTab] = useAtom(mediationTabAtom)
  const [selectedClients, setSelectedClients] = useAtom(selectedClientsAtom)

  useEffect(() => {
    if (!mediation) return
    form.setFieldValue('duration', mediation.duration)
    form.setFieldValue('date', mediation.date)
    form.setFieldValue('title', mediation.title)
    form.setFieldValue('notes', mediation.notes)
    form.setFieldValue('color', mediation.color)
    setSelectedClients(mediation.data.map((d) => d.client))
    setTab()
  }, [mediation])

  function setTab() {
    if (!mediation?.data.length) return

    const firstClient = mediation.data[0]

    const hasDifferentData = mediation.data.some((d, index) => {
      if (index === 0) return false

      const hasInvoiceDifference = !!d.invoice !== !!firstClient.invoice

      if (hasInvoiceDifference) return true

      if (d.invoice && firstClient.invoice) {
        return (
          d.invoice.amount !== firstClient.invoice.amount ||
          d.invoice.dueDate.getTime() !==
            firstClient.invoice.dueDate.getTime() ||
          d.invoice.reference !== firstClient.invoice.reference
        )
      }

      return d.email !== firstClient.email
    })

    setMediationTab(hasDifferentData ? 'multiple' : 'single')
    if (hasDifferentData) {
      setMediationClients(
        mediation.data.map((d) => ({
          client: d.client,
          data: {
            email: d.email,
            invoice: d.invoice
              ? {
                  clientId: d.client.id,
                  amount: Number(d.invoice.amount),
                  dueDate: d.invoice.dueDate,
                  reference: d.invoice.reference || undefined,
                }
              : null,
          },
        }))
      )
    } else {
      setMediationAllClients({
        email: mediation.data[0]?.email || false,
        invoice: mediation.data[0]?.invoice
          ? {
              clientId: mediation.data[0].client.id,
              amount: Number(mediation.data[0].invoice.amount),
              dueDate: mediation.data[0].invoice.dueDate,
              reference: mediation.data[0].invoice.reference || undefined,
            }
          : null,
      })
    }
  }

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
    if (!value.title.length) {
      toast.error('Please enter a title')
      return false
    }
    if (!value.data.length) {
      toast.error('Please select at least one client', {
        description: 'The select input is at the top of the form',
      })
      return false
    }

    // const now = new Date()
    // if (value.date < now) {
    //   toast.error('Mediation date cannot be in the past')
    //   return false
    // }

    // const invalidInvoices = value.data
    //   .filter((d) => d.invoice)
    //   .some((d) => {
    //     console.log(d.invoice?.dueDate)
    //     return d.invoice?.dueDate && d.invoice?.dueDate < now
    //   })

    // if (invalidInvoices) {
    //   toast.error('Invoice due dates cannot be in the past')
    //   return false
    // }

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
            title: form.getFieldValue('title'),
            notes: form.getFieldValue('notes'),
            color: form.getFieldValue('color'),
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
          <InputWithIcon
            icon={<FilePenLine />}
            form={form}
            name="title"
            label="Title"
            placeholder="Title"
            type="text"
            required
            className="w-full"
          />
          <ColorPicker
            form={form}
            name="color"
            label="Color"
            className="w-full"
            innerClassName="md:mt-1"
          />
          <ClientsSelect form={form} className="w-full md:col-span-2" />
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
            className="w-full"
          />
        </div>
        <MediationFormDetails form={form} />
        <MediationNotes form={form} />
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
