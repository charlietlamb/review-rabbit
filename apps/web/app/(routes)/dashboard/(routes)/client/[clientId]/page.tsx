import { getClientById } from '@remio/design-system/actions/clients/get-client-by-id'
import { fetchInvoices } from '@remio/design-system/actions/invoices/fetch-invoices'
import Client from '@remio/design-system/components/dashboard/client/client'
import { redirect } from 'next/navigation'

export default async function page({
  params,
}: {
  params: { clientId: string }
}) {
  const { clientId } = await params
  try {
    const [client, invoices] = await Promise.all([
      getClientById(clientId),
      fetchInvoices(0, clientId),
    ])
    return <Client client={client} initialInvoices={invoices} />
  } catch (error) {
    return redirect('/dashboard/clients')
  }
}
