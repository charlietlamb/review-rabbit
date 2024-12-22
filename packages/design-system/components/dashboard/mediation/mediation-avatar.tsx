import { cn } from '@remio/design-system/lib/utils'
import { MediationWithData } from '@remio/database'
import ClientAvatar from '../clients/client-avatar'

export default function MediationAvatar({
  mediation,
  className,
}: {
  mediation: MediationWithData
  className?: string
}) {
  return (
    <div className={cn('flex -space-x-3 items-center', className)}>
      {mediation.data.slice(0, 3).map((data, index) => (
        <ClientAvatar
          key={data.client.id}
          client={data.client}
          size="xs"
          className={`relative ${
            index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10'
          }`}
        />
      ))}
      {mediation.data.length > 3 && (
        <div className="rounded-full h-6 w-6 text-xs relative bg-muted flex items-center justify-center">
          +{mediation.data.length - 3}
        </div>
      )}
    </div>
  )
}
