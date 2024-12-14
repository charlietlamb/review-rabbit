import { TanstackForm } from '@remio/design-system/components/form/tanstack-form'
import RequiredLabel from '@remio/design-system/components/misc/required-label'
import ClientMultiSelect from './client-mutli-select'

export default function ClientsSelect({ form }: { form: TanstackForm<any> }) {
  return (
    <div>
      <RequiredLabel>Select Clients</RequiredLabel>
      <ClientMultiSelect />
    </div>
  )
}
