'use client'

import DashboardContentHeader from '../header/dashboard-content-header'
import { Button } from '@rabbit/design-system/components/ui/button'
import Businesses from './businesses'
import BusinessFormDialog from './business-form-dialog'

export default function Business() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Business"
        subtitle="Manage your business information."
      />
      <div className="p-4 w-full flex flex-col gap-2">
        <Businesses />
        <BusinessFormDialog>
          <Button variant="shine" className="w-full">
            Add Business
          </Button>
        </BusinessFormDialog>
      </div>
    </div>
  )
}
