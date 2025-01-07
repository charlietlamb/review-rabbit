import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@rabbit/design-system/components/ui/sheet'
import { useCalendarContext } from '../calendar-context'
import { useEffect, useState } from 'react'
import Spinner from '@rabbit/design-system/components/misc/spinner'

export default function CalendarManageEventSheet() {
  return null
  // const { manageEventSheetOpen, setManageEventSheetOpen, selectedEvent } =
  //   useCalendarContext()

  // const [automationItem, setAutomationItem] = useState<AutomationItem | null>(
  //   null
  // )

  // useEffect(() => {
  //   async function fetchAutomation() {
  //     if (selectedEvent) {
  //       const automationItem = await getAutomationItemById(selectedEvent.id)
  //       setAutomationItem(automationItem)
  //     }
  //   }
  //   fetchAutomation()
  // }, [selectedEvent])

  // return (
  //   <Sheet open={manageEventSheetOpen} onOpenChange={setManageEventSheetOpen}>
  //     <SheetContent className="flex flex-col divide-y p-0 gap-0">
  //       <SheetHeader className="p-4">
  //         <SheetTitle>Manage Automation</SheetTitle>
  //         <SheetDescription>
  //           Edit the details of this automation
  //         </SheetDescription>
  //       </SheetHeader>
  //       {automationItem ? (
  //         <AutomationItemForm automationItem={automationItem} />
  //       ) : (
  //         <div className="flex-grow w-full h-full flex items-center justify-center">
  //           <Spinner />
  //         </div>
  //       )}
  //     </SheetContent>
  //   </Sheet>
  // )
}
