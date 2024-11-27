import DubFormExternalItem from './dub-form-external-item'
import { providerData } from '../../../../../lib/providers'

export default function DubFormExternal() {
  return (
    <div className="flex gap-2">
      {providerData.map((platform) => (
        <DubFormExternalItem platform={platform} key={platform.name} />
      ))}
    </div>
  )
}
