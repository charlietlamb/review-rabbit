'use client'

import { useEffect, useState } from 'react'
import { CreateOptionData } from '../options/create-options-data'
import CreateFormPreview from '../preview/create-form-preview'
import CreateFormText from './create-form-text'
import CreateFormUpload from './create-form-upload'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@dubble/design-system/components/ui/resizable'
import {
  createConnectsAtom,
  createTypeAtom,
} from '@dubble/design-system/atoms/dashboard/create/create-atom'
import { useSetAtom } from 'jotai'
import CreateFormHeader from './create-form-header'
import { Connect } from '@dubble/database/schema/connects'
import CreateFormAccounts from './create-form-accounts'
import CreateFormSchedule from './create-form-schedule'
import CreateFormSubmit from './create-form-submit'
import { Separator } from '@dubble/design-system/components/ui/separator'

export default function CreateForm({
  createOption,
  connects,
}: {
  createOption: CreateOptionData
  connects: Connect[]
}) {
  const setCreateType = useSetAtom(createTypeAtom)
  const setConnects = useSetAtom(createConnectsAtom)
  const [text, setText] = useState('')

  useEffect(() => {
    setCreateType(createOption)
    setConnects(connects)
  }, [createOption, setCreateType, connects])

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={60}
        minSize={20}
        className="divide-y flex flex-col relative"
      >
        <CreateFormHeader />
        <CreateFormText />
        <CreateFormUpload />
        <CreateFormAccounts />
        <CreateFormSchedule />
        <Separator />
        <CreateFormSubmit />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40} minSize={20}>
        <CreateFormPreview />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
