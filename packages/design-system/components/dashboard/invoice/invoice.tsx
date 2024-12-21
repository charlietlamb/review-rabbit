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
import { Download } from 'lucide-react'
import { Button } from '@remio/design-system/components/ui/button'
import getInvoice from '@remio/design-system/lib/pdf/get-invoice'
import useUser from '@remio/design-system/hooks/use-user'

export default function Invoice({ invoice }: { invoice: InvoiceWithClient }) {
  const user = useUser()
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
        right={
          <Button
            className="flex items-center gap-2 ml-auto"
            variant="shine"
            onClick={() => {
              if (user) getInvoice(invoice, user)
            }}
          >
            Download
            <Download className="h-4 w-4" />
          </Button>
        }
      />
      <InvoiceForm
        invoice={invoice}
        className="w-full p-4"
        onDelete={() => router.push('/dashboard/invoices')}
      />
    </div>
  )
}
