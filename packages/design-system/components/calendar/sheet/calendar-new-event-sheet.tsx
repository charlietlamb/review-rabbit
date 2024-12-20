import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@remio/design-system/components/ui/sheet'
import { useCalendarContext } from '../calendar-context'
import MediationForm from '@remio/design-system/components/dashboard/mediation/mediation-form'

export default function CalendarNewEventSheet() {
  const { newEventSheetOpen, setNewEventSheetOpen } = useCalendarContext()
  return (
    <Sheet open={newEventSheetOpen} onOpenChange={setNewEventSheetOpen}>
      <SheetContent className="flex flex-col divide-y p-0 gap-0">
        <SheetHeader className="p-4">
          <SheetTitle>New Mediation</SheetTitle>
          <SheetDescription>
            Create a new mediation to add to your calendar
          </SheetDescription>
        </SheetHeader>
        <MediationForm />
      </SheetContent>
    </Sheet>
  )
}
