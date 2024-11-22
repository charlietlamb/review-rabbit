import { Label } from '@dubble/design-system/components/ui/label'
import DubForm from './form/dub-form'
import DubFormSubmit from './form/dub-form-submit'
import DubMedia from './media/dub-media'
import DubMediaSection from './media/dub-media-section'

export default function Dub() {
  return (
    <div className="flex flex-col divide-y divide-border relative flex-grow overflow-hidden">
      <DubForm />
      <DubMediaSection />
      <DubFormSubmit />
    </div>
  )
}
