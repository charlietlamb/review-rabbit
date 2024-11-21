import {
  dubLanguagesAtom,
  dubMediaAtom,
  dubMediaDurationAtom,
  dubTokensAtom,
} from '@dubble/design-system/atoms/dashboard/dub/dubAtom'
import { useAtomValue } from 'jotai'

export default function DubSummary() {
  const dubMedia = useAtomValue(dubMediaAtom)
  const dubLanguages = useAtomValue(dubLanguagesAtom)
  const dubMediaDuration = useAtomValue(dubMediaDurationAtom)
  const dubTokens = useAtomValue(dubTokensAtom)
  return (
    <div className="flex flex-col gap-2 font-heading">
      Dubble will dub {dubMedia.length} media for {dubLanguages.length}
      languages. This will cost {dubTokens} tokens.
    </div>
  )
}
