'use client'

import { InvoiceWithClient } from '@remio/database/schema/invoices'
import { useSetAtom } from 'jotai'
import { breadcrumbOverrideAtom } from '@remio/design-system/atoms/dashboard/breadcrumb/breadcrumb-atom'
import { useEffect } from 'react'
import DashboardContentHeader from '../header/dashboard-content-header'
import ClientAvatar from '../clients/client-avatar'
import InvoiceForm from '../invoices/invoice-form'
import { useRouter } from 'next/navigation'
import { invoiceAtom } from '@remio/design-system/atoms/dashboard/invoice/invoice-atom'

export default function Invoice({ invoice }: { invoice: InvoiceWithClient }) {
  const breadcrumbOverride = useSetAtom(breadcrumbOverrideAtom)
  const setInvoice = useSetAtom(invoiceAtom)
  const router = useRouter()

  useEffect(() => {
    breadcrumbOverride(invoice.client.name)
  }, [invoice.client.name])

  useEffect(() => {
    setInvoice(invoice)
  }, [invoice])

  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title={`Manage Invoice`}
        subtitle={`Manage and view information about this invoice for ${invoice.client.name}`}
        left={<ClientAvatar client={invoice.client} className="mr-4" />}
      />
      <InvoiceForm
        invoice={invoice}
        className="w-full p-4"
        onDelete={() => router.push('/dashboard/invoices')}
      />
    </div>
  )
}
