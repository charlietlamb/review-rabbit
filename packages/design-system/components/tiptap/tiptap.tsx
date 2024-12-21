'use client'

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface TiptapProps {
  content: string | null
  onChange: (value: string) => void
}

import './styles.scss'

export default function Tiptap({ content, onChange }: TiptapProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
  })

  return <EditorContent editor={editor} value={content} onChange={onChange} />
}
