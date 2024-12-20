import { redirect } from 'next/navigation'
import Invoice from '@remio/design-system/components/dashboard/invoice/invoice'
import { getInvoiceById } from '@remio/design-system/actions/invoices/get-invoice-by-id'

export default async function page({
  params,
}: {
  params: { invoiceId: string }
}) {
  const { invoiceId } = await params
  try {
    const invoice = await getInvoiceById(invoiceId)
    return <Invoice invoice={invoice} />
  } catch (error) {
    return redirect('/dashboard/invoices')
  }
}
