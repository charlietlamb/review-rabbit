import { fetchClients } from '@remio/design-system/actions/clients/fetch-clients'
import ClientsManage from '@remio/design-system/components/dashboard/clients/clients-manage'

export default async function ClientsManagePage() {
  const initialClients = await fetchClients(0)
  return <ClientsManage initialClients={initialClients} />
}
