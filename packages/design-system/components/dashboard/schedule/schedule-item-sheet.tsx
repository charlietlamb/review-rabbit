import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@remio/design-system/components/ui/sheet'
import { MediationWithData } from '@remio/database/schema/mediations'
import { useEffect, useState } from 'react'
import MediationForm from '../mediation/mediation-form'
import { Feature } from '@remio/design-system/components/roadmap-ui/calendar'
import { getMediationById } from '@remio/design-system/actions/mediations/get-mediation-by-id'
import Spinner from '@remio/design-system/components/misc/spinner'
import { useSetAtom } from 'jotai'
import {
  selectedClientsAtom,
  mediationClientsAtom,
} from '@remio/design-system/atoms/dashboard/mediations/mediation-atoms'

export default function ScheduleItemSheet({
  feature,
  children,
}: {
  feature: Feature
  children: React.ReactNode
}) {
  const [mediation, setMediation] = useState<MediationWithData | null>(null)
  const setSelectedClients = useSetAtom(selectedClientsAtom)
  const setMediationClients = useSetAtom(mediationClientsAtom)

  useEffect(() => {
    async function fetchMediation() {
      const mediation = await getMediationById(feature.id)
      setMediation(mediation)
      setSelectedClients(mediation?.data.map((d) => d.client) || [])
      setMediationClients(
        mediation?.data.map((d) => ({
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
        })) || []
      )
    }
    fetchMediation()
  }, [feature])
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">{children}</SheetTrigger>
      <SheetContent className="p-0 flex flex-col divide-y gap-0">
        <SheetHeader className="p-4">
          <SheetTitle>{mediation?.title}</SheetTitle>
          <SheetDescription>Edit your mediation</SheetDescription>
        </SheetHeader>

        {mediation ? (
          <div className="overflow-y-auto">
            <MediationForm mediation={mediation} />
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
