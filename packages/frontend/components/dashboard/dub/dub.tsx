import DubForm from './form/dub-form'
import DubFormSubmit from './form/dub-form-submit'
import DubHeader from './header/dub-header'

export default function Dub() {
  return (
    <div className="flex flex-col divide-y divide-border relative flex-grow overflow-hidden">
      <DubHeader />
      <div className="p-4 flex-grow overflow-hidden flex flex-col">
        <DubForm />
      </div>
      <DubFormSubmit />
    </div>
  )
}
