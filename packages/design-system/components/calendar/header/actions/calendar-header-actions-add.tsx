import { Button } from '@rabbit/design-system/components/ui/button'
import AutomationFormDialog from '@rabbit/design-system/components/dashboard/automations/automation-form-dialog'

export default function CalendarHeaderActionsAdd() {
  return (
    <AutomationFormDialog>
      <Button className="flex items-center gap-1" variant="shine">
        New Automation
      </Button>
    </AutomationFormDialog>
  )
}
