import { cn } from '@remio/design-system/lib/utils'
import { MediationWithData } from '@remio/database'
import ClientAvatar, { sizeClasses } from '../clients/client-avatar'

const spaceClasses = {
  xs: '-space-x-3',
  sm: '-space-x-4',
  md: '-space-x-5',
  lg: '-space-x-6',
}

export default function MediationAvatar({
  mediation,
  className,
  size = 'xs',
}: {
  mediation: MediationWithData
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}) {
  return (
    <div className={cn('flex items-center', className, spaceClasses[size])}>
      {mediation.data.slice(0, 3).map((data, index) => (
        <ClientAvatar
          key={data.client.id}
          client={data.client}
          size={size}
          className={`relative ${
            index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10'
          }`}
        />
      ))}
      {mediation.data.length > 3 && (
        <div
          className={cn(
            'rounded-full relative bg-muted flex items-center justify-center',
            sizeClasses[size]
          )}
        >
          +{mediation.data.length - 3}
        </div>
      )}
    </div>
  )
}
