import DubFormExternalItem from './dub-form-external-item'
import { externalData } from './external'

export default function DubFormExternal() {
  return (
    <div className="flex gap-2">
      {externalData.map((platform) => (
        <DubFormExternalItem platform={platform} key={platform.name} />
      ))}
    </div>
  )
}
