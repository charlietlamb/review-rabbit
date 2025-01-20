import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@rabbit/design-system/components/ui/avatar'
import { Business } from '@rabbit/database/types/business-location-types'
import { env } from '@rabbit/env'
import { cn } from '@rabbit/design-system/lib/utils'

export default function BusinessAvatar({
  business,
  className,
}: {
  business: Business
  className?: string
}) {
  return (
    <Avatar className={cn('h-full size-16 rounded-md', className)}>
      <AvatarImage
        src={
          business.image
            ? `${env.NEXT_PUBLIC_AWS_S3_URL}${business.image}`
            : undefined
        }
      />
      <AvatarFallback className="rounded-md">
        {business.name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}
