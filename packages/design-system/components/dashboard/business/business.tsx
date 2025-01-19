'use client'

import { Button } from '@rabbit/design-system/components/ui/button'
import BusinessFormDialog from './business-form-dialog'
import TableSearch from '../table/table-search'
import { useAtom } from 'jotai'
import { businessSearchAtom } from '@rabbit/design-system/atoms/dashboard/business/business-atoms'
import BusinessTable from './business-table'
import DashboardWrap from '@rabbit/design-system/components/dashboard/dashboard/dashboard-wrap'

export default function Business() {
  const [search, setSearch] = useAtom(businessSearchAtom)
  return (
    <DashboardWrap
      title="Business"
      subtitle="Manage your business information."
    >
      <div className="flex items-center justify-between p-4 gap-4">
        <TableSearch search={search} setSearch={setSearch} />
        <BusinessFormDialog>
          <Button variant="shine">Add New Business</Button>
        </BusinessFormDialog>
      </div>
      <div className="overflow-y-auto flex-grow">
        <BusinessTable />
      </div>
    </DashboardWrap>
  )
}
