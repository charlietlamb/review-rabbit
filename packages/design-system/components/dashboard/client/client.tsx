'use client'

import { Client as ClientType } from '@remio/database/schema/clients'
import { useAtom, useSetAtom } from 'jotai'
import { breadcrumbOverrideAtom } from '@remio/design-system/atoms/dashboard/breadcrumb/breadcrumb-atom'
import { useEffect } from 'react'
import DashboardContentHeader from '../header/dashboard-content-header'
import { clientAtom } from '@remio/design-system/atoms/dashboard/client/client-atom'
import ClientAvatar from '../clients/client-avatar'
import { Button } from '@remio/design-system/components/ui/button'
import InvoiceEditDialog from '../invoices/invoice-edit-dialog'
import ClientsForm from '../clients/clients-form'
import { useRouter } from 'next/navigation'
import InvoicesTable from '../invoices/invoices-table'
import TableSearch from '../table/table-search'
import { invoicesAtoms } from '@remio/design-system/atoms/dashboard/invoices/invoices-atoms'
import { invoicesSearchAtom } from '@remio/design-system/atoms/dashboard/invoices/invoices-atoms'
import { InvoiceWithClient } from '@remio/database/schema/invoices'

export default function Client({
  client,
  initialInvoices,
}: {
  client: ClientType
  initialInvoices: InvoiceWithClient[]
}) {
  const breadcrumbOverride = useSetAtom(breadcrumbOverrideAtom)
  const setClient = useSetAtom(clientAtom)
  const router = useRouter()
  const setInvoices = useSetAtom(invoicesAtoms)
  const [search, setSearch] = useAtom(invoicesSearchAtom)

  useEffect(() => {
    setInvoices(initialInvoices)
  }, [])

  useEffect(() => {
    breadcrumbOverride(client.name)
  }, [client.name])

  useEffect(() => {
    setClient(client)
  }, [client])

  return (
    <div className="flex flex-col divide-y overflow-hidden">
      <DashboardContentHeader
        title={client.name}
        subtitle={`Manage and view information about ${client.name}`}
        left={<ClientAvatar client={client} className="mr-4" />}
        right={
          <InvoiceEditDialog client={client}>
            <Button className="ml-auto" variant="shine">
              Create Invoice
            </Button>
          </InvoiceEditDialog>
        }
      />
      <ClientsForm
        client={client}
        className="w-full p-4"
        onDelete={() => router.push('/dashboard/clients')}
      />
      <div className="flex items-center justify-between p-4 gap-4">
        <TableSearch search={search} setSearch={setSearch} />
        <InvoiceEditDialog client={client}>
          <Button variant="shine">Create Invoice</Button>
        </InvoiceEditDialog>
      </div>
      <div className="p-4 overflow-y-auto flex-grow">
        <InvoicesTable clientId={client.id} />
      </div>
    </div>
  )
}
