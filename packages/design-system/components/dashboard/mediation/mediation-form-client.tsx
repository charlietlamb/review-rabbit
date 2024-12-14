import { TanstackForm } from '@remio/design-system/components/form/tanstack-form'
import { Client } from '@remio/database/schema/clients'

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
        Editing details for {client ? client?.name : 'all clients'}
      </h2>
    </div>
  )
}
