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
      setIsLoading(true)
      setAttemptSubmitted(true)
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
      setIsLoading(false)
      setIsOpen?.(false)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: mediationDataSchema,
    },
  })
  return (
    <FormProvider value={{ attemptSubmitted }}>
      <div className="flex flex-col divide-y">
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
      </div>
    </FormProvider>
  )
}
