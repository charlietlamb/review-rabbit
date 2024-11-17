'use client'

import DubFormLanguage from './dub-form-language'
import DubFormMedia from './dub-form-media'

export default function DubForm() {
  return (
    <div className="flex flex-col gap-4">
      <DubFormLanguage />
      <DubFormMedia />
    </div>
  )
}
