import { fetchRecentInvoices } from '@remio/design-system/actions/dashboard/fetch-recent-invoices'
import InvoicesManage from '@remio/design-system/components/dashboard/invoices/invoices-manage'

export default async function InvoicesManagePage() {
  const initialInvoices = await fetchRecentInvoices(0)
  return <InvoicesManage initialInvoices={initialInvoices} />
}
