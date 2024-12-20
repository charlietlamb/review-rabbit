import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@remio/design-system/components/ui/sheet'
import { useCalendarContext } from '../calendar-context'
import MediationForm from '@remio/design-system/components/dashboard/mediation/mediation-form'
import { useEffect, useState } from 'react'
import { MediationWithData } from '@remio/database'
import { getMediationById } from '@remio/design-system/actions/mediations/get-mediation-by-id'
import Spinner from '@remio/design-system/components/misc/spinner'

export default function CalendarManageEventSheet() {
  const { manageEventSheetOpen, setManageEventSheetOpen, selectedEvent } =
    useCalendarContext()

  const [mediation, setMediation] = useState<MediationWithData | null>(null)

  useEffect(() => {
    async function fetchMediation() {
      if (selectedEvent) {
        const mediation = await getMediationById(selectedEvent.id)
        setMediation(mediation)
      }
    }
    fetchMediation()
  }, [selectedEvent])

  return (
    <Sheet open={manageEventSheetOpen} onOpenChange={setManageEventSheetOpen}>
      <SheetContent className="flex flex-col divide-y p-0 gap-0">
        <SheetHeader className="p-4">
          <SheetTitle>Manage Mediation</SheetTitle>
          <SheetDescription>
            Edit the details of this mediation
          </SheetDescription>
        </SheetHeader>
        {mediation ? (
          <MediationForm mediation={mediation} />
        ) : (
          <div className="flex-grow w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
