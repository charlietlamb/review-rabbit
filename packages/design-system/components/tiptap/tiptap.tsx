'use client'

import { BlockEditor } from '@remio/tiptap/components/BlockEditor'

interface TiptapProps {
  content: string | null
  onChange: (value: string) => void
}

export default function Tiptap({ content, onChange }: TiptapProps) {
  return <BlockEditor content={content} onChange={onChange} />
}
