import { ClientWithData } from '@rabbit/database'
import { cn } from '@rabbit/design-system/lib/utils'
import ClientAvatar from './client-avatar'

export default function ClientMultiAvatar({
  clients,
  className,
}: {
  clients: ClientWithData[]
  className?: string
}) {
  return (
    <div className={cn('flex -space-x-2 items-center', className)}>
      {clients.slice(0, 3).map((client, index) => (
        <ClientAvatar
          key={client.id}
          client={client}
          size="xs"
          className={`relative ${
            index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10'
          }`}
        />
      ))}
      {clients.length > 3 && (
        <div className="rounded-full h-6 w-6 text-xs relative bg-muted flex items-center justify-center">
          +{clients.length - 3}
        </div>
      )}
    </div>
  )
}
