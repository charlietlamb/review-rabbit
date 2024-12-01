import { LoaderCircle, Check, X, AudioLines, Search } from 'lucide-react'
import { Input } from '@ff/design-system/components/ui/input'
import { useState, useEffect } from 'react'
import validateUrl from '@ff/design-system/lib/misc/validate-url'
import { AcceptedMimeType } from 'data/file-types'

export default function UrlInput({
  value,
  setValue,
  valid,
  setValid,
  mediaTypes,
  placeholder,
}: {
  value: string
  setValue: (value: string) => void
  valid: boolean
  setValid: (valid: boolean) => void
  mediaTypes: AcceptedMimeType[]
  placeholder?: string
}) {
  const [isValidating, setIsValidating] = useState(false)

  useEffect(() => {
    setIsValidating(!!value)
    const timeoutId = setTimeout(async () => {
      if (value) {
        const isValid = await validateUrl(value, mediaTypes)
        setValid(isValid)
        setIsValidating(false)
      } else {
        setValid(false)
        setIsValidating(false)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [value])

  return (
    <div className="relative">
      <Input
        id="input-10"
        className="peer pe-9"
        placeholder={placeholder}
        type="url"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
        {!value.length ? (
          <Search size={16} strokeWidth={2} aria-hidden="true" />
        ) : isValidating ? (
          <LoaderCircle
            className="animate-spin"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            role="presentation"
          />
        ) : valid ? (
          <Check
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            className="text-green-500"
          />
        ) : (
          <X
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            className="text-red-500"
          />
        )}
      </div>
    </div>
  )
}
