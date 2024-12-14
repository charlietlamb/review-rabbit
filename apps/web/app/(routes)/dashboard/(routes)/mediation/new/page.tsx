import { fetchClients } from '@remio/design-system/actions/clients/fetch-clients'
import NewMediation from '@remio/design-system/components/dashboard/mediation/new-mediation'

export default async function page() {
  const clients = await fetchClients(0)
  return <NewMediation clients={clients} />
}
