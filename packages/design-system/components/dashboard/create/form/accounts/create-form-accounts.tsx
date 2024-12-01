'use client'
import { useAtom, useAtomValue } from 'jotai'
import {
  createConnectsAtom,
  createSelectedConnectsAtom,
} from '@ff/design-system/atoms/dashboard/create/create-atom'
import { MultiSelect } from '@ff/design-system/components/misc/account-multi-select'
import { Label } from '@ff/design-system/components/ui/label'
export default function AccountMultiSelect() {
  const [selectedConnects, setSelectedConnects] = useAtom(
    createSelectedConnectsAtom
  )
  const connects = useAtomValue(createConnectsAtom)

  return (
    <div className="flex flex-col gap-4 p-4">
      <Label className="font-heading font-bold">Accounts</Label>
      <MultiSelect
        options={connects}
        onValueChange={(value) =>
          setSelectedConnects(
            connects.filter((connect) => value.includes(connect.id))
          )
        }
        value={selectedConnects.map((connect) => connect.id)}
        placeholder="Select accounts..."
      />
    </div>
  )
}
