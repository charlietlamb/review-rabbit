import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@rabbit/design-system/components/ui/sheet'
import { useCalendarContext } from '../calendar-context'
// import AutomationForm from '@rabbit/design-system/components/dashboard/automation/automation-form'

export default function CalendarNewEventSheet() {
  const { newEventSheetOpen, setNewEventSheetOpen } = useCalendarContext()
  return (
    <Sheet open={newEventSheetOpen} onOpenChange={setNewEventSheetOpen}>
      <SheetContent className="flex flex-col divide-y p-0 gap-0">
        <SheetHeader className="p-4">
          <SheetTitle>New Automation</SheetTitle>
          <SheetDescription>
            Create a new automation to add to your calendar
          </SheetDescription>
        </SheetHeader>
        {/* <AutomationForm /> */}
      </SheetContent>
    </Sheet>
  )
}
