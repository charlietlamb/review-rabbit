'use client'

import { Button } from '@rabbit/design-system/components/ui/button'
import { Plus, Rocket } from 'lucide-react'
import AutomationFormDialog from '@rabbit/design-system/components/dashboard/automations/automation-form-dialog'

export default function DashboardHeaderActions() {
  return (
    <div className="flex items-center ml-auto h-full pr-2">
      <AutomationFormDialog>
        <Button
          variant="shine"
          className="h-8 flex items-center gap-2 fill-foreground text-foreground"
        >
          <Rocket /> New Automation
        </Button>
      </AutomationFormDialog>
    </div>
  )
}
