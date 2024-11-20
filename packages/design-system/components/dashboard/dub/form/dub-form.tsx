'use client'

import { Label } from '@/components/ui/label'
import DubFormLanguage from './dub-form-language'
import DubFormMedia from './dub-form-media'

export default function DubForm() {
  return (
    <div className="flex flex-col gap-2 overflow-hidden flex-grow">
      <Label className="font-heading text-xl">Select Languages</Label>
      <DubFormLanguage />
      <Label className="font-heading text-xl">Select Media</Label>
      <DubFormMedia />
    </div>
  )
}
