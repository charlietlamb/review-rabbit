import { TanstackForm } from '@remio/design-system/components/form/tanstack-form'
import { Client } from '@remio/database/schema/clients'
import MediationFormClientInvoice from './mediation-form-client-invoice'
import MediationFormClientEmail from './mediation-form-client-email'

export default function MediationFormClient({
  form,
  client,
}: {
  form: TanstackForm<any>
  client?: Client
}) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="font-heading text-lg font-bold">
        {client ? client?.name : 'All clients'}
      </h2>
      <MediationFormClientInvoice form={form} client={client} />
      <MediationFormClientEmail form={form} client={client} />
    </div>
  )
}
