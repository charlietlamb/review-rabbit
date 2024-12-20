import { Client } from '@remio/database'
import {
  Avatar,
  AvatarFallback,
} from '@remio/design-system/components/ui/avatar'
import { useIsMobile } from '@remio/design-system/hooks/use-mobile'
import { cn } from '@remio/design-system/lib/utils'
import { useTheme } from 'next-themes'

export default function ClientAvatar({
  client,
  size: propSize,
  className,
}: {
  client: Client
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}) {
  const isMobile = useIsMobile()
  const size = propSize || (isMobile ? 'sm' : 'md')

  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  }

  return (
    <Avatar className={cn(className, sizeClasses[size])}>
      <AvatarFallback
        className={`bg-${client.color}-300 dark:bg-${client.color}-700`}
      >
        {client.name.split(' ')[0][0].toUpperCase()}
        {client.name.split(' ')[1]?.[0]?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
