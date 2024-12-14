import { TanstackForm } from '@remio/design-system/components/form/tanstack-form'
import ClientSelect from './client-select'
import RequiredLabel from '@remio/design-system/components/misc/required-label'

// TODO: Add client select with mulitiselcect
export default function ClientSelects({ form }: { form: TanstackForm<any> }) {
  return (
    <div>
      <RequiredLabel>Select Clients</RequiredLabel>
      {/* <ClientSelect form={form} /> */}
    </div>
  )
}
