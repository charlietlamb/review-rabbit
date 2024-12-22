import { useEffect, useState } from 'react'
import { useEditor, useEditorState } from '@tiptap/react'
import type { AnyExtension, Editor } from '@tiptap/core'
import { TiptapCollabProvider, WebSocketStatus } from '@hocuspocus/provider'

import { ExtensionKit } from '@remio/tiptap/extensions/extension-kit'
import type { EditorUser } from '../components/BlockEditor/types'

declare global {
  interface Window {
    editor: Editor | null
  }
}

export const useBlockEditor = ({
  userId,
  userName = 'Maxi',
  content,
  onChange,
}: {
  userId?: string
  userName?: string
  content: string | null
  onChange: (value: string) => void
}) => {
  const editor = useEditor(
    {
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: (ctx) => {
        ctx.editor.commands.setContent(content || '')
        ctx.editor.commands.focus('start', { scrollIntoView: true })
      },
      extensions: [...ExtensionKit({})].filter(
        (e): e is AnyExtension => e !== undefined
      ),
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
      content: content || '',
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML())
      },
    },
    []
  )
  const users = useEditorState({
    editor,
    selector: (ctx): (EditorUser & { initials: string })[] => {
      if (!ctx.editor?.storage.collaborationCursor?.users) {
        return []
      }

      return ctx.editor.storage.collaborationCursor.users.map(
        (user: EditorUser) => {
          const names = user.name?.split(' ')
          const firstName = names?.[0]
          const lastName = names?.[names.length - 1]
          const initials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`

          return { ...user, initials: initials.length ? initials : '?' }
        }
      )
    },
  })

  window.editor = editor

  return { editor, users }
}
