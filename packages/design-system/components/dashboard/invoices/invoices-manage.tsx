'use client'

import { useSetAtom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { invoicesAtoms } from '@remio/design-system/atoms/dashboard/invoices/invoices-atoms'
import DashboardContentHeader from '../header/dashboard-content-header'
import { Button } from '@remio/design-system/components/ui/button'
import { InvoiceWithClient } from '@remio/database'
import TableSearch from '../table/table-search'
import InvoiceCreateDialog from './invoice-edit-dialog'
import InvoicesTable from './invoices-table'
import { invoicesSearchAtom } from '@remio/design-system/atoms/dashboard/invoices/invoices-atoms'

export default function InvoicesManage({
  initialInvoices,
}: {
  initialInvoices: InvoiceWithClient[]
}) {
  const setInvoices = useSetAtom(invoicesAtoms)
  const [search, setSearch] = useAtom(invoicesSearchAtom)
  useEffect(() => {
    setInvoices(initialInvoices)
  }, [])

  return (
    <div className="flex flex-col divide-y flex-grow overflow-hidden h-full">
      <DashboardContentHeader
        title="Manage Payments"
        subtitle="View and manage your payments"
      />
      <div className="flex items-center justify-between p-4 gap-4">
        <TableSearch search={search} setSearch={setSearch} />
        <InvoiceCreateDialog>
          <Button variant="shine">Add New Invoice</Button>
        </InvoiceCreateDialog>
      </div>
      <div className="p-4 overflow-y-auto flex-grow">
        <InvoicesTable />
      </div>
    </div>
  )
}
