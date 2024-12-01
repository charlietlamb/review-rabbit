import { cn } from '@ff/design-system/lib/utils'
import { useAtomValue } from 'jotai'
import { providersAtom } from '@ff/design-system/atoms/providers/provders-atom'
import ProviderCard from './provider-card'

export default function DashboardConnectProviders() {
  const providers = useAtomValue(providersAtom)
  return (
    <div className="flex-grow overflow-y-auto">
      <div className={cn('grid grid-cols-1 gap-4 w-full p-4 h-auto')}>
        {providers.map((provider) => (
          <ProviderCard key={provider.name} provider={provider} />
        ))}
      </div>
    </div>
  )
}
