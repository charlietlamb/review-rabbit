import { cn } from '@dubble/design-system/lib/utils'
import { useAtomValue } from 'jotai'
import {
  providersAtom,
  providersLayoutAtom,
} from '@dubble/design-system/atoms/providers/providersAtom'
import ProviderCard from './provider-card'

export default function DashboardConnectProviders() {
  const providersLayout = useAtomValue(providersLayoutAtom)
  const providers = useAtomValue(providersAtom)
  return (
    <div className="flex-grow">
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-y-auto h-full overflow-x-hidden p-4 h-auto',
          providersLayout === 'list' &&
            'grid-cols-1 md:grid-cols-1 lg:grid-cols-1'
        )}
      >
        {providers.map((provider) => (
          <ProviderCard key={provider.name} provider={provider} />
        ))}
      </div>
    </div>
  )
}
