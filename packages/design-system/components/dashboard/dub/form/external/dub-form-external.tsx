import DubFormExternalItem from './dub-form-external-item'
import { socialPlatforms } from '../../../../../lib/socials'

export default function DubFormExternal() {
  return (
    <div className="flex gap-2">
      {socialPlatforms.map((platform) => (
        <DubFormExternalItem platform={platform} key={platform.name} />
      ))}
    </div>
  )
}
