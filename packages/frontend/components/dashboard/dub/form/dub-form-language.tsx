'use client'

import MultipleSelector from '@/components/misc/multi-select'
import { languagesOptions } from '@/types/language'
import { useAtom } from 'jotai'
import { dubLanguagesOptionsAtom } from '@/atoms/dashboard/dub/dubAtom'

export default function Select46() {
  const [languageOptions, setLanguageOptions] = useAtom(dubLanguagesOptionsAtom)
  return (
    <MultipleSelector
      commandProps={{
        label: 'Select languages',
      }}
      value={languageOptions}
      onChange={setLanguageOptions}
      defaultOptions={languagesOptions}
      placeholder="Select languages"
      hideClearAllButton
      hidePlaceholderWhenSelected
      emptyIndicator={<p className="text-center text-sm">No results found</p>}
    />
  )
}
