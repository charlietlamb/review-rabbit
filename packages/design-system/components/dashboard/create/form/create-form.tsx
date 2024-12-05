'use client'

import { useEffect } from 'react'
import { CreateOptionData } from '../options/create-options-data'
import CreateFormPreview from '../preview/create-form-preview'
import CreateFormText from './caption/create-form-text'
import CreateFormUpload from './upload/create-form-upload'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@ff/design-system/components/ui/resizable'
import {
  createConnectsAtom,
  createTypeAtom,
} from '@ff/design-system/atoms/dashboard/create/create-atom'
import { useSetAtom } from 'jotai'
import CreateFormHeader from './header/create-form-header'
import { Connect } from '@ff/database/schema/connects'
import CreateFormAccounts from './accounts/create-form-accounts'
import CreateFormSchedule from './schedule/create-form-schedule'
import CreateFormSubmit from './submit/create-form-submit'
import CreateFormAudio from './audio/create-form-audio'

export default function CreateForm({
  createOption,
  connects,
}: {
  createOption: CreateOptionData
  connects: Connect[]
}) {
  const setCreateType = useSetAtom(createTypeAtom)
  const setConnects = useSetAtom(createConnectsAtom)

  useEffect(() => {
    setCreateType(createOption)
    setConnects(
      connects.filter((connect) =>
        createOption.providers?.includes(connect.providerId)
      )
    )
  }, [createOption, setCreateType, connects])

  return (
    <>
      <div className="hidden md:flex overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-grow">
          <ResizablePanel
            defaultSize={60}
            minSize={20}
            className="divide-y flex flex-col relative"
          >
            <CreateFormHeader />
            <div className="overflow-y-auto divide-y flex flex-col">
              <CreateFormText />
              <CreateFormUpload />
              <CreateFormAccounts />
              <CreateFormSchedule />
              <CreateFormAudio />
            </div>
            <CreateFormSubmit />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40} minSize={20}>
            <CreateFormPreview />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="flex md:hidden flex-col divide-y overflow-hidden">
        <CreateFormHeader />
        <div className="overflow-y-auto divide-y flex flex-col">
          <CreateFormText />
          <CreateFormUpload />
          <CreateFormAccounts />
          <CreateFormSchedule />
          <CreateFormAudio />
          <CreateFormPreview />
        </div>
        <CreateFormSubmit />
      </div>
    </>
  )
}
