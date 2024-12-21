import { TanstackForm } from '@remio/design-system/components/form/tanstack-form'
import Tiptap from '@remio/design-system/components/tiptap/tiptap'
import RequiredLabel from '@remio/design-system/components/misc/required-label'

export default function MediationNotes({ form }: { form: TanstackForm<any> }) {
  return (
    <div className="p-4">
      <form.Field name="notes">
        {(field) => (
          <div className="flex flex-col gap-2">
            <RequiredLabel>Notes</RequiredLabel>
            <Tiptap
              content={field.state.value}
              onChange={(value) => field.handleChange(value)}
            />
          </div>
        )}
      </form.Field>
    </div>
  )
}
