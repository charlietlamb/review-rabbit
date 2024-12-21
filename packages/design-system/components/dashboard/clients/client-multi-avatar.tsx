import { Client } from '@remio/database'
import ClientAvatar from './client-avatar'
import { cn } from '@remio/design-system/lib/utils'

export default function ClientMultiAvatar({
  clients,
  className,
}: {
  clients: Client[]
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
