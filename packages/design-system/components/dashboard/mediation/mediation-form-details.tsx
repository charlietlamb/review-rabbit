import { TanstackForm } from '@remio/design-system/components/form/tanstack-form'
import { useAtom, useAtomValue } from 'jotai'
import { mediationTabAtom } from '@remio/design-system/atoms/dashboard/mediations/mediation-atoms'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@remio/design-system/components/ui/tabs'
import { cn } from '@remio/design-system/lib/utils'
import { selectedClientsAtom } from '@remio/design-system/atoms/dashboard/mediations/mediation-atoms'
import MediationFormClient from './mediation-form-client'
import { useEffect } from 'react'

export default function MediationFormDetails({
  form,
}: {
  form: TanstackForm<any>
}) {
  const [tab, setTab] = useAtom(mediationTabAtom)
  const selectedClients = useAtomValue(selectedClientsAtom)

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as 'single' | 'multiple')}
      className="flex flex-col divide-y"
    >
      <TabsList className="font-heading grid w-full h-auto grid-cols-2 p-4 font-bold bg-transparent">
        <TabsTrigger
          value="single"
          className={cn(
            'bg-transparent data-[state=active]:bg-foreground data-[state=active]:text-background'
          )}
        >
          Edit all clients
        </TabsTrigger>
        <TabsTrigger
          value="multiple"
          className={cn(
            'bg-transparent data-[state=active]:bg-foreground data-[state=active]:text-background'
          )}
        >
          Edit clients individually
        </TabsTrigger>
      </TabsList>
      <TabsContent value="single" className="m-0">
        <MediationFormClient form={form} />
      </TabsContent>
      <TabsContent value="multiple" className="flex flex-col m-0 divide-y">
        {selectedClients.map((client) => (
          <MediationFormClient form={form} client={client} key={client.id} />
        ))}
      </TabsContent>
    </Tabs>
  )
}
