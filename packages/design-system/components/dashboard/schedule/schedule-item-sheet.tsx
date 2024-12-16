import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@remio/design-system/components/ui/sheet'

export default function ScheduleItemSheet({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Schedule Item</SheetTitle>
        </SheetHeader>
        oioi
      </SheetContent>
    </Sheet>
  )
}
