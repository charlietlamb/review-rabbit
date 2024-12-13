import { getClientById } from '@remio/design-system/actions/clients/get-client-by-id'
import Client from '@remio/design-system/components/dashboard/client/client'
import { redirect } from 'next/navigation'

export default async function page({
  params,
}: {
  params: { clientId: string }
}) {
  const { clientId } = await params
  try {
    const client = await getClientById(clientId)
    return <Client client={client} />
  } catch (error) {
    return redirect('/dashboard/clients')
  }
}
