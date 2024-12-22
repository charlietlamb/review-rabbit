import { EditorContent } from '@tiptap/react'
import { useRef } from 'react'

import { LinkMenu } from '@remio/tiptap/components/menus'

import { useBlockEditor } from '@remio/tiptap/hooks/useBlockEditor'

import '@remio/tiptap/styles/index.css'

import { ColumnsMenu } from '@remio/tiptap/extensions/MultiColumn/menus'
import {
  TableColumnMenu,
  TableRowMenu,
} from '@remio/tiptap/extensions/Table/menus'
import { TextMenu } from '../menus/TextMenu'
import { ContentItemMenu } from '../menus/ContentItemMenu'

export const BlockEditor = ({
  content,
  onChange,
}: {
  content: string | null
  onChange: (value: string) => void
}) => {
  const menuContainerRef = useRef(null)

  const { editor, users } = useBlockEditor({
    content,
    onChange,
  })

  if (!editor || !users) {
    return null
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex flex-col flex-1 h-full">
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  )
}

export default BlockEditor
