import { Input } from '@dubble/design-system/components/ui/input'
import { Dispatch, SetStateAction } from 'react'
import { SocialPlatformData } from '../../lib/socials'

export default function InputWithStart({
  text,
  setText,
  platform,
}: {
  text: string
  setText: Dispatch<SetStateAction<string>>
  platform: SocialPlatformData
}) {
  const { name, start, placeholder } = platform
  return (
    <div className="flex rounded-lg shadow-sm shadow-black/5">
      {start && (
        <span className="-z-10 inline-flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground">
          {start}
        </span>
      )}
      <Input
        id={start}
        className="-ms-px rounded-s-none shadow-none"
        placeholder={placeholder}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}
