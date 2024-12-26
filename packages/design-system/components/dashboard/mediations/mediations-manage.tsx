'use client'

import { useSetAtom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { mediationsAtoms } from '@remio/design-system/atoms/dashboard/mediations/mediations-atoms'
import DashboardContentHeader from '../header/dashboard-content-header'
import { Button } from '@remio/design-system/components/ui/button'
import { MediationWithData } from '@remio/database'
import TableSearch from '../table/table-search'
import MediationsTable from './mediations-table'
import { mediationsSearchAtom } from '@remio/design-system/atoms/dashboard/mediations/mediations-atoms'

export default function MediationsManage({
  initialMediations,
}: {
  initialMediations: MediationWithData[]
}) {
  const setMediations = useSetAtom(mediationsAtoms)
  const [search, setSearch] = useAtom(mediationsSearchAtom)
  useEffect(() => {
    setMediations(initialMediations)
  }, [])

  return (
    <div className="flex flex-col divide-y flex-grow overflow-hidden h-full">
      <DashboardContentHeader
        title="Manage Payments"
        subtitle="View and manage your payments"
      />
      <div className="flex items-center justify-between p-4 gap-4">
        <TableSearch search={search} setSearch={setSearch} />
        <Button variant="shine">Schedule Mediation</Button>
      </div>
      <div className="p-4 overflow-y-auto flex-grow">
        <MediationsTable />
      </div>
    </div>
  )
}
