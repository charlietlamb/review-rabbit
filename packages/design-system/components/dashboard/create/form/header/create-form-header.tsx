import { useAtomValue } from 'jotai'
import { createTypeAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import React from 'react'

export default function CreateFormHeader() {
  const createOption = useAtomValue(createTypeAtom)
  return (
    <div className="flex justify-between items-center px-4 py-2">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold font-heading truncate">
            Create a {createOption?.name}
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {createOption?.description}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {createOption?.providerIcons.map((provider) => (
          <React.Fragment key={provider.name}>{provider.icon}</React.Fragment>
        ))}
      </div>
    </div>
  )
}
