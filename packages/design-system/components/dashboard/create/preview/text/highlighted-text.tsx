'use client'

import { cn } from '@ff/design-system/lib/utils'

interface HighlightedTextProps {
  text: string
  className?: string
}

export function HighlightedText({ text, className }: HighlightedTextProps) {
  // Split text into segments that are either hashtags, mentions, or regular text
  const segments = text.split(/([@#][\w\u0590-\u05ff]+)/g)

  return (
    <span className={cn('whitespace-pre-wrap break-words', className)}>
      {segments.map((segment, index) => {
        const isHashtag = segment.startsWith('#')
        const isMention = segment.startsWith('@')

        if (isHashtag || isMention) {
          return (
            <span
              key={index}
              className="text-primary font-medium hover:underline cursor-pointer"
            >
              {segment}
            </span>
          )
        }

        return <span key={index}>{segment}</span>
      })}
    </span>
  )
}
