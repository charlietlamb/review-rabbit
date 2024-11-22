import { Label } from '@dubble/design-system/components/ui/label'
import DubMedia from './dub-media'

export default function DubMediaSection() {
  return (
    <div className="flex flex-col gap-2 flex-grow p-4">
      <Label className="font-heading text-xl">Selected Media</Label>
      <div className="overflow-y-auto flex flex-col gap-2 flex-grow">
        <DubMedia />
      </div>
    </div>
  )
}
