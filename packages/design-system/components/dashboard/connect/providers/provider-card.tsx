import { ProviderData } from '@dubble/design-system/lib/providers'
import { cn } from '@dubble/design-system/lib/utils'

export default function ProviderCard({ provider }: { provider: ProviderData }) {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden border divide-y group cursor-pointer h-auto transition-all duration-300">
      <div
        className={cn(
          'text-lg font-bold font-heading p-2 transition-all duration-300',
          provider.className
        )}
      >
        <div className="flex items-center gap-2 text-white">
          {provider.icon}
          {provider.name}
        </div>
      </div>
      <div className="p-2">23 accounts connected</div>
    </div>
  )
}
