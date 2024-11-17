'use client'

import MultipleSelector from '@/components/misc/multi-select'
import { languagesWithFlags } from '@/types/language'

export default function Select46() {
  const languagesOptions = languagesWithFlags.map((language) => ({
    value: language.value,
    label: `${language.flag} ${language.label}`,
  }))
  return (
    <MultipleSelector
      commandProps={{
        label: 'Select languages',
      }}
      value={languagesOptions.slice(0, 2)}
      defaultOptions={languagesOptions}
      placeholder="Select languages"
      hideClearAllButton
      hidePlaceholderWhenSelected
      emptyIndicator={<p className="text-center text-sm">No results found</p>}
    />
  )
}
